import React, { useState } from "react";
import { connect } from "react-redux";

import { changeCount, resetCount } from "./../actions/index";

import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import Header from "./Header";
import ShoppingDialog from "./ShoppingDialog";
import ConfirmationSnackBar from "./ConfirmationSnackBar";

// To fetch state
function mapStateToProps(state) {
  return {
    drinks: state.products.drinks,
    count: state.products.count
  };
}

// To fetch actions to alter the state
function mapDispatchToProps(dispatch) {
  return {
    changeCount: (name, change) => {
      dispatch(changeCount({ name, change }));
    },
    resetCount: () => {
      dispatch(resetCount());
    }
  };
}

function Container(props) {
  const [activeTab, setActiveTab] = useState("0");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSnackBarOpen, setSnackBar] = useState(false);

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  //Closes shopping cart dialog
  function closeDialog() {
    setDialogOpen(false);
  }

  //Closes shopping cart dialog, confirms purchase, and resets shopping cart
  function confirmPurchase() {
    setDialogOpen(false);
    //TODO: Send mutation to db to update purchase history
    props.resetCount();
    setSnackBar(true);
  }

  function openDialog() {
    setDialogOpen(true);
  }

  return (
    <div>
      <Header count={props.count} openDialog={openDialog} />
      <Paper className="paper">
        <Tabs
          changeActiveTab={changeActiveTab}
          active={activeTab}
          changeCount={props.changeCount}
          content={props.drinks}
        />
      </Paper>

      <ShoppingDialog
        open={isDialogOpen}
        shoppingCart={props.drinks}
        closeDialog={closeDialog}
        confirm={confirmPurchase}
      />
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
