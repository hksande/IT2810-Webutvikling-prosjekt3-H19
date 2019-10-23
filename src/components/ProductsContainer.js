import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";
import { connect } from "react-redux";

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
    drinks: state.products.drinks,
    orderBy: state.products.orderBy,
    searchString: state.products.searchString
  };
}

function ProductsContainer(props) {
  const variables = props.orderBy === null ? {} : { orderBy: props.orderBy };

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
