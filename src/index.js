import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//Apollo
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
//Redux
//import { Provider } from "react-redux";
//import store from "./store/configureStore";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

import { Provider } from "react-redux";
import store from "./store/configureStore";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
