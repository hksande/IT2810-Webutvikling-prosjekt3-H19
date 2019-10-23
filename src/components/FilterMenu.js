import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { setOrderBy } from "./../actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setOrderBy: orderBy => {
      dispatch(setOrderBy({ orderBy }));
    }
  };
}

const filterList = [
  ["Pris høy-lav", "price_DESC"],
  ["Pris lav-høy", "price_ASC"]
];

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

function FilterMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = e => {
    props.setOrderBy(e.currentTarget.dataset.div_name);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Filter
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filterList.map((el, index) => {
          return (
            <StyledMenuItem
              key={index}
              data-div_name={el[1]}
              onClick={handleMenuClick}
            >
              <ListItemText primary={el[0]} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(FilterMenu);
