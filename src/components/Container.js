import React, { useState } from "react";
import { connect } from "react-redux";

import { incrementCount } from "./../actions/index";

import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import List from "./List";
import Header from "./Header";

// To fetch state
function mapStateToProps(state) {
  return {
    drinks: state.count.drinks
  };
}

// To fetch actions to alter the state
function mapDispatchToProps(dispatch) {
  return {
    incrementCount: id => {
      dispatch(incrementCount({ id }));
    }
  };
}
function Container(props) {
  const [activeTab, setActiveTab] = useState("0");

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  return (
    <div>
      <Header />
      <Paper className="paper">
        <Tabs changeActiveTab={changeActiveTab} active={activeTab} />
        <List content={props.drinks} incrementCount={props.incrementCount} />
      </Paper>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
