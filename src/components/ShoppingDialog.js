import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import "./../index.css";

export default function ShoppingDialog(props) {
  const checkEmpty = () => {
    let sum = 0;
    const values = Object.values(props.shoppingCart);
    if (values.length === 0) {
      return true;
    }
    values.forEach(el => (sum += el));
    return sum === 0;
  };

  return (
    <Dialog width="md" fullWidth open={props.open}>
      <DialogTitle>Handlekurv</DialogTitle>
      <DialogContent dividers>
        <ul className="shopping-cart-list">
          {Object.keys(props.shoppingCart).map((key, index) => {
            return props.shoppingCart[key] === 0 ? null : (
              <div key={key}>
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "0 40px"
                  }}
                >
                  <p>{key}</p>
                  <p style={{ color: "gray" }}>{props.shoppingCart[key]}</p>
                </li>
                <Divider />
              </div>
            );
          })}
        </ul>
      </DialogContent>
      <DialogActions>
        <div className="flex-container-space-between">
          <Button color="primary" onClick={props.closeDialog}>
            Fortsett å handle
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={props.confirm}
            disabled={checkEmpty()}
            data-cy="bekreft"
          >
            Bekreft kjøp
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
