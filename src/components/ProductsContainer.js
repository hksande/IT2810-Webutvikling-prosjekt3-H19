import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";
import { connect } from "react-redux";

const ALL_PRODUCTS = gql`
  query allProducts($searchString: String, $orderBy: ProductOrderByInput) {
    allProducts(searchString: $searchString, orderBy: $orderBy) {
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

const GET_PRODUCTS_BY_TYPE = gql`
  query getProductsByType(
    $searchString: String
    $orderBy: ProductOrderByInput
    $type: String
  ) {
    getProductsByType(
      searchString: $searchString
      orderBy: $orderBy
      type: $type
    ) {
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
  const filter = "Rødvin";
  const query = filter === null ? ALL_PRODUCTS : GET_PRODUCTS_BY_TYPE;
  const dataName = filter === null ? "allProducts" : "getProductsByType";
  let variables = {
    searchString: props.searchString,
    orderBy: props.orderBy
  };
  variables =
    filter === null ? { ...variables } : { ...variables, type: filter };

  const { data, loading, error } = useQuery(query, {
    variables: variables
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data);
  return (
    <List
      content={data[dataName]}
      changeCount={props.changeCount}
      drinks={props.drinks}
    />
  );
}

export default connect(mapStateToProps)(ProductsContainer);
