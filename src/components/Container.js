import React, { useState } from "react";
import { connect } from "react-redux";

import { incrementCount } from "./../actions/index";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import "./../index.css";

import Tabs from "./Tabs";
import List from "./List";

const listContent = [
  { header: "Rødvin", description: "Rund og mild", price: 179 },
  { header: "Hvitvin", description: "Søt", price: 152 },
  { header: "Øl", description: "En god juleøl", price: 89 },
  { header: "Cider", description: "Skikkelig digg", price: 79 },
  { header: "Vodka", description: "Nam nam", price: 349 }
];

// To fetch state
function mapStateToProps(state) {
  return {
    count: state.count.count
  };
}

// To fetch actions to alter the state
function mapDispatchToProps(dispatch) {
  return {
    incrementCount: () => {
      dispatch(incrementCount());
    }
  };
}

function Container(props) {
  const [activeTab, setActiveTab] = useState("0");

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  function handleClick() {
    props.incrementCount();
  }

  return (
    <div>
      <Paper className="paper">
        <Tabs changeActiveTab={changeActiveTab} active={activeTab} />
        <List content={listContent} />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Increment
        </Button>
        <h2>{props.count}</h2>
      </Paper>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
