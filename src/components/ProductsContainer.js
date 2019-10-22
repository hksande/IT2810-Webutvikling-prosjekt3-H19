import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";
import { connect } from "react-redux";

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

function mapStateToProps(state) {
  return {
    drinks: state.count.drinks
  };
}

function ProductsContainer(props) {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {}
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
