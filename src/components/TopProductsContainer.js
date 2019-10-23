import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { connect } from "react-redux";
import Map from "./Map";

const GET_TOP_PRODUCTS = gql`
  {
    products(orderBy: purchased_DESC, limit: 10) {
      name
      purchased
      origin
    }
  }
`;

function mapStateToProps(state) {
  return {
    drinks: state.count.drinks
  };
}

function TopProductsContainer() {
  const { loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: {}
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return <Map data={data} />;
}

export default connect(mapStateToProps)(TopProductsContainer);
