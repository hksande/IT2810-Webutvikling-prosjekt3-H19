import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";

const GET_PRODUCTS = gql`
  {
    products {
      name
      id
      type
      price
      purchased
      origin
      img
      description
    }
  }
`;

export default function ProductsContainer(props) {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List
      content={data.products}
      incrementCount={props.incrementCount}
      decrementCount={props.decrementCount}
    />
  );
}
