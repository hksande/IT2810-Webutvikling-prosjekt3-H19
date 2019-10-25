import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import List from "./List";
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
    orderBy: state.products.orderBy,
    searchString: state.products.searchString,
    typeFilter: state.products.typeFilter
  };
}

function AllProductsContainer(props) {
  const [currentPage, setCurrentPage] = useState(1);

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

  const { data, fetchMore, loading, error } = useQuery(query, {
    variables: variables,
    fetchPolicy: "cache-and-network"
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

  console.log(data[dataName].length);
  return (
    <List
      currentPage={currentPage}
      productsPerPage={PRODUCTS_PER_PAGE}
      setCurrentPage={setCurrentPage}
      content={data[dataName]}
      changeCount={props.changeCount}
      drinks={props.drinks}
      data-cy="list"
      fetchMore={fetchMore}
      query={query}
      /*
      onLoadMore={() => {
        return fetchMore({
          variables: {
            skip: data[dataName].length
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              console.log("no more results");
              return prev;
            }
            console.log("More results :)");
            return Object.assign({}, prev, {
              content: [...prev[dataName], ...fetchMoreResult[dataName]]
            });
          }
        });
      }}*/
    />
  );
}

export default connect(mapStateToProps)(AllProductsContainer);
