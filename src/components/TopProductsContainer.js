import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { stopRefetch } from "../actions/index";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import Map from "./Map";

const GET_TOP_PRODUCTS = gql`
  {
    allProducts(searchString: "", orderBy: purchased_DESC, first: 10) {
      name
      purchased
      origin
    }
  }
`;

function mapStateToProps(state) {
  return {
    drinks: state.products.drinks,
    refetch: state.products.refetch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stopRefetch: () => {
      dispatch(stopRefetch());
    }
  };
}

function TopProductsContainer(props) {
  const { refetch, loading, error, data } = useQuery(GET_TOP_PRODUCTS, {
    variables: {}
  });

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "40vh 0"
        }}
      >
        <CircularProgress color="primary" disableShrink />
      </div>
    );
  if (error) return "Det har skjedd en feil :(";

  if (props.refetch) {
    refetch().then(() => {
      props.stopRefetch();
    });
  }

  return <Map data={data.allProducts} />;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopProductsContainer);
