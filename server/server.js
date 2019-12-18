import express from "express";
import { typeDefs, resolvers } from "./schema.js";
import { ApolloServer } from "apollo-server-express";
import { Prisma } from "prisma-binding";

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  cors: true,
  typeDefs, //Own implemented types written in GraphQL SDL
  resolvers,
  // The connection to the database
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "database/generated/prisma.graphql", //Prismas auto-generated schema.
      endpoint: "http://localhost:4466",
      debug: true //log all GraphQL queries & mutations
    })
  })
});

const app = express();
server.applyMiddleware({ app });

// Launch web-server.
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
