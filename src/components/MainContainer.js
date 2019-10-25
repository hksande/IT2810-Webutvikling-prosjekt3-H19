import React, { useState } from "react";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { changeCount, resetCount } from "../actions/index";

import Paper from "@material-ui/core/Paper";
import "./../index.css";

import Tabs from "./Tabs";
import Header from "./Header";
import ShoppingDialog from "./ShoppingDialog";
import ConfirmationSnackBar from "./ConfirmationSnackBar";

const ADD_PURCHASE = gql`
  mutation addPurchase($name: [String!], $purchased: [Int!]) {
    addPurchase(name: $name, purchased: $purchased) {
      name
    }
  }
`;

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

function MainContainer(props) {
  const [activeTab, setActiveTab] = useState("0");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSnackBarOpen, setSnackBar] = useState(false);

  const [addPurchase, { data }] = useMutation(ADD_PURCHASE);

  function changeActiveTab(active) {
    setActiveTab(active);
  }

  //Closes shopping cart dialog
  function closeDialog() {
    setDialogOpen(false);
  }

  //Closes shopping cart dialog, confirms purchase, and resets shopping cart
  function confirmPurchase() {
    const name = Object.keys(props.drinks);
    const purchased = Object.values(props.drinks);
    addPurchase({
      variables: {
        name,
        purchased
      }
    }).then(res => {
      setDialogOpen(false);
      props.resetCount();
      setSnackBar(true);
    });
  }

  function openDialog() {
    setDialogOpen(true);
  }

  return (
    <div>
      <Header />
      <Paper className="paper">
        <Tabs
          changeActiveTab={changeActiveTab}
          active={activeTab}
          changeCount={props.changeCount}
          content={props.drinks}
          count={props.count}
          openDialog={openDialog}
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
)(MainContainer);
