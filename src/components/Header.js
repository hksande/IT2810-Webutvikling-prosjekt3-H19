import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="headerContainer">
        <div />
        <Typography variant="h4">Vinmonopolet</Typography>
        <IconButton color="inherit" aria-label="shopping-cart">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
