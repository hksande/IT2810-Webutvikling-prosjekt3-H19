import { gql } from "apollo-server-express";
import { async } from "q";

export const typeDefs = gql`
  directive @constraint(
    # String constraints
    minLength: Int
    maxLength: Int
    startsWith: String
    endsWith: String
    notContains: String
    pattern: String
    format: String

    # Number constraints
    min: Int
    max: Int
    exclusiveMin: Int
    exclusiveMax: Int
    multipleOf: Int
  ) on INPUT_FIELD_DEFINITION

  enum ProductOrderByInput {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    type_ASC
    type_DESC
    price_ASC
    price_DESC
    purchased_ASC
    purchased_DESC
    origin_ASC
    origin_DESC
    img_ASC
    img_DESC
    description_ASC
    description_DESC
  }

  type Product {
    id: ID!
    name: String!
    type: String!
    price: Int!
    purchased: Int!
    origin: String!
    img: String!
    description: String!
  }

  input ProductWhereUniqueInput {
    id: ID
    name: String
  }

  type Purchase {
    name: String!
    purchased: Int!
  }

  input ProductUpdateInput {
    name: String!
    purchased: Int!
  }

  type Query {
    product(name: String!): Product
    getProductsByType(
      searchString: String
      type: String
      orderBy: ProductOrderByInput
      skip: Int
      first: Int
    ): [Product]!
    allProducts(
      searchString: String
      orderBy: ProductOrderByInput
      skip: Int
      first: Int
    ): [Product]!
  }

  type Mutation {
    createProduct(
      name: String!
      type: String!
      price: Int!
      purchased: Int!
      origin: String!
      img: String!
      description: String!
    ): Product!
    addPurchase(name: [String!], purchased: [Int!]): [Product!]
    updateProduct(
      data: ProductUpdateInput!
      where: ProductWhereUniqueInput!
    ): Product
  }
`;

//Resolvers for queries and mutations that were generated with prisma
export const resolvers = {
  Query: {
    product: (parent, args, context, info) => {
      return context.db.query.product(
        {
          where: { name: args.name }
        },
        info
      );
    },
    getProductsByType: async (parent, args, context, info) => {
      const where = args.searchString
        ? { name_contains: args.searchString, type: args.type }
        : { type: args.type };
      const data = await context.db.query.products(
        {
          where,
          orderBy: args.orderBy,
          skip: args.skip,
          first: args.first
        },
        info
      );
      return data;
    },
    allProducts: async (parent, args, context, info) => {
      const where = args.searchString
        ? { name_contains: args.searchString }
        : {};
      const data = await context.db.query.products(
        {
          where,
          orderBy: args.orderBy,
          skip: args.skip,
          first: args.first
        },
        info
      );
      return data;
    }
  },

  Mutation: {
    createProduct: (parent, args, context, info) => {
      return context.db.mutation.createProduct(
        {
          data: {
            name: args.name,
            type: args.type,
            price: args.price,
            purchased: args.purchased,
            origin: args.origin,
            img: args.img,
            description: args.description
          }
        },
        info
      );
    },
    addPurchase: async (parent, args, context, info) => {
      const data = await context.db.query.products({
        where: { name_in: args.name },
        info
      });
      console.log(data);
      console.log(data.length);
      for (var i = 0; i < data.length; i++) {
        console.log("hei");
        await context.db.mutation.updateProduct(
          {
            data: {
              purchased: parseInt(data[i].purchased) + args.purchased[i]
            },
            where: {
              name: args.name[i]
            }
          },
          info
        );
      }
    }
  }
};
/*
    addPurchase: async (parent, args, context, info) => {
      //args.prototype.forEach.call(args, pname => {
      const updatedPurchase = await Promise.all(
        Object.keys(
          args.map(async pname => {
            return await context.db.mutation.updateProduct(
              {
                where: {
                  name: pname
                },
                data: {
                  connect: {
                    purchased: data.purchased + args[pname]
                  }
                }
              },
              info
            );
          })
        )
      );
      console.log(updatedPurchase);
    }
  }
};
    updateManyProducts: async (parent, args, context, info) => {
      for (var key in args) {
        //var value = args[key];
        const data = await context.db.query.product({
          where: { name: key },
          info
        });
        return context.db.mutation.updateManyProducts(
          {
            data: {
              purchased: data.purchased + args[key]
            },
            where: {
              name: key
            }
          },
          info
        );
      }
    }
  }
};
/*
export var dict = {
  "Agostino Barb d'Asti Superiore Moliss": 2,
  "Alta Alella Laietà Gran Reserva Brut Nature 2013": 1
};
*/
