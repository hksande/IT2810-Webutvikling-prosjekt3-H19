import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React from "react";
import List from "./List";
import { stopRefetch } from "../actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

const PRODUCTS_PER_PAGE = 10;

// Query to fetch all products:

const ALL_PRODUCTS = gql`
  query allProducts(
    $searchString: String
    $orderBy: ProductOrderByInput
    $first: Int
    $skip: Int
  ) {
    allProducts(
      searchString: $searchString
      orderBy: $orderBy
      first: $first
      skip: $skip
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

// Query to fetch products based on type:

const GET_PRODUCTS_BY_TYPE = gql`
  query getProductsByType(
    $searchString: String
    $orderBy: ProductOrderByInput
    $type: String
    $first: Int
    $skip: Int
  ) {
    getProductsByType(
      searchString: $searchString
      orderBy: $orderBy
      type: $type
      first: $first
      skip: $skip
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
    orderBy: state.filter.orderBy,
    searchString: state.filter.searchString,
    typeFilter: state.filter.typeFilter,
    page: state.pagination.page,
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

function AllProductsContainer(props) {
  // Decide which query and variables to use:
  const filter = props.typeFilter;
  const query = filter === null ? ALL_PRODUCTS : GET_PRODUCTS_BY_TYPE;
  const dataName = filter === null ? "allProducts" : "getProductsByType";
  let variables = {
    searchString: props.searchString,
    orderBy: props.orderBy,
    first: PRODUCTS_PER_PAGE,
    skip: 0
  };
  variables =
    filter === null ? { ...variables } : { ...variables, type: filter };

  const { data, fetchMore, refetch, loading, error } = useQuery(query, {
    variables: variables,
    fetchPolicy: "cache"
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
  if (error) return `${error} Det har skjedd en feil :(`;
  if (props.refetch) {
    refetch().then(() => {
      props.stopRefetch();
    });
  }

  //console.log(data[dataName].length);
  return (
    <List
      productsPerPage={PRODUCTS_PER_PAGE}
      content={data[dataName].slice(0, 10)}
      hasNextPage={data[dataName].length < 11}
      changeCount={props.changeCount}
      drinks={props.drinks}
      data-cy="list"
      onLoadMore={() => {
        return fetchMore({
          query: query,
          variables: {
            ...variables,
            first: PRODUCTS_PER_PAGE + 1,
            skip: (props.page - 1) * PRODUCTS_PER_PAGE
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return fetchMoreResult;
          }
        });
      }}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllProductsContainer);
