import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

export default function Header(props) {
  return (
    <AppBar position="static">
      <Toolbar className="headerContainer">
        <div />
        <Typography variant="h4">Vinmonopolet</Typography>
        <Tooltip title="Handlekurv">
          <Badge badgeContent={props.count} color="secondary">
            <IconButton color="inherit" aria-label="shopping-cart" onClick={props.openDialog}>
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
