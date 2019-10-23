import ApolloClient from "apollo-boost";

/*
export const client = new ApolloClient({
  uri: "http://it2810-24.idi.ntnu.no:5000/graphql"
});*/

export const client = new ApolloClient({
  uri: "http://it2810-24.idi.ntnu.no:5000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});