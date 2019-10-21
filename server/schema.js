import { gql } from "apollo-server-express";

export const typeDefs = gql`
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

  type Query {
    product(name: String!): Product
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
    addProduct(name: String!): Product
    removeProduct(name: String!): Product
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
    }
    //updateProduct
  }
};
