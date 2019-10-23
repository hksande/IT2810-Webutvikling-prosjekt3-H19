import { gql } from "apollo-server-express";

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

  input ProductUpdateInput {
    name: String!
    purchased: Int
  }

  type Query {
    product(name: String!): Product
    getProducts(
      searchString: String
      type: String
      orderBy: ProductOrderByInput
      offset: Int
      limit: Int
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
    addPurchase(name: String!, purchased: Int!): Product
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
    getProducts: async (parent, args, context, info) => {
      const search = args.searchString
        ? {
            name_contains: args.searchString
          }
        : {};
      const data = await context.db.query.products(
        {
          search,
          name,
          type: args.type
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
      const data = await context.db.query.product({
        where: { name: args.name },
        info
      });
      return context.db.mutation.updateProduct(
        {
          data: {
            purchased: data.purchased + args.purchased
          },
          where: {
            name: args.name
          }
        },
        info
      );
    }
  }
};
