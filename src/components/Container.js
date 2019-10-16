import React, { useState } from "react";
import { connect } from "react-redux";

import { incrementCount, decrementCount } from "./../actions/index";

import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import List from "./List";
import Header from "./Header";
import ShoppingDialog from "./ShoppingDialog";

// To fetch state
function mapStateToProps(state) {
  return {
    drinks: state.count.drinks,
    count: state.count.count
  };
}

// To fetch actions to alter the state
function mapDispatchToProps(dispatch) {
  return {
    incrementCount: id => {
      dispatch(incrementCount({ id }));
    },
    decrementCount: id => {
      dispatch(decrementCount({ id }));
    }
  };
}
function Container(props) {
  const [activeTab, setActiveTab] = useState("0");
  const [isDialogOpen, openDialog] = useState(false);

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  function closeDialog() {
    openDialog(false);
  }

  function confirmPurchase() {
    openDialog(false);
  }

  return (
    <div>
      <Header count={props.count} openDialog={openDialog} />
      <Paper className="paper">
        <Tabs changeActiveTab={changeActiveTab} active={activeTab} />
        <List
          content={props.drinks}
          incrementCount={props.incrementCount}
          decrementCount={props.decrementCount}
        />
      </Paper>
      <ShoppingDialog
        open={isDialogOpen}
        shoppingCart={props.drinks}
        closeDialog={closeDialog}
        confirm={confirmPurchase}
      />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
