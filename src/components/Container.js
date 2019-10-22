import React, { useState } from "react";
import { connect } from "react-redux";

import { incrementCount, decrementCount, resetCount } from "./../actions/index";

import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import Header from "./Header";
import ShoppingDialog from "./ShoppingDialog";
import ConfirmationSnackBar from "./ConfirmationSnackBar";

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
    },
    resetCount: () => {
      dispatch(resetCount());
    }
  };
}
function Container(props) {
  const [activeTab, setActiveTab] = useState("0");
  const [isDialogOpen, openDialog] = useState(false);
  const [isSnackBarOpen, setSnackBar] = useState(false);

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  //Closes shopping cart dialog
  function closeDialog() {
    openDialog(false);
  }

  //Closes shopping cart dialog, confirms purchase, and resets shopping cart
  function confirmPurchase() {
    openDialog(false);
    //TODO: Send mutation to db to update purchase history
    props.resetCount();
    setSnackBar(true);
  }

  return (
    <div>
      <Header count={props.count} openDialog={openDialog} />
      <Paper className="paper">
        <Tabs
          changeActiveTab={changeActiveTab}
          active={activeTab}
          incrementCount={props.incrementCount}
          content={props.drinks}
          decrementCount={props.decrementCount}
        />
      </Paper>
      {/*}
      <ShoppingDialog
        open={isDialogOpen}
        shoppingCart={props.drinks}
        closeDialog={closeDialog}
        confirm={confirmPurchase}
  />*/}
      <ConfirmationSnackBar
        open={isSnackBarOpen}
        message="Kjøp gjennomført!"
        close={setSnackBar}
      />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
