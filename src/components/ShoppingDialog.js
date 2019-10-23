import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import React from "react";

export default function ShoppingDialog(props) {
  console.log(props.shoppingCart);
  return (
    <Dialog width="md" fullWidth open={props.open}>
      <DialogTitle>Handlekurv</DialogTitle>
      <DialogContent dividers>
        <List>
          {Object.keys(props.shoppingCart).map(function(key, index) {
            return (
              <ListItem>
                <ListItemText
                  primary={key}
                  secondary={props.shoppingCart[key]}
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.closeDialog}>
          Fortsett å handle
        </Button>
        <Button color="primary" onClick={props.confirm}>
          Bekreft kjøp
        </Button>
      </DialogActions>
    </Dialog>
  );
}
