import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";
import { connect } from "react-redux";
import { client } from "./../apolloClient";

const query = gql`
  query products($orderBy: ProductOrderByInput) {
    products(orderBy: $orderBy) {
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

function mapStateToProps(state) {
  return {
    drinks: state.count.drinks
  };
}

function ProductsContainer(props) {

  const filter = "price_DESC";
  const variables = filter === null ? {} : { orderBy: filter };

  const { data, loading, error } = useQuery(query, {
    variables: variables
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List
      content={data.products}
      changeCount={props.changeCount}
      drinks={props.drinks}
    />
  );
}

export default connect(mapStateToProps)(ProductsContainer);
