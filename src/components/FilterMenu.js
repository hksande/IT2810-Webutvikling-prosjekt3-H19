import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FilterList from "@material-ui/icons/FilterList";
import Tooltip from "@material-ui/core/Tooltip";
import { setOrderBy, setPage } from "./../actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setOrderBy: orderBy => {
      dispatch(setOrderBy({ orderBy }));
      dispatch(setPage({ change: 0 }));
    }
  };
}

function mapStateToProps(state) {
  return {
    orderBy: state.filter.orderBy
  };
}

const filterList = [
  ["Siste nytt", null],
  ["Pris stigende", "price_ASC"],
  ["Pris synkende", "price_DESC"],
  ["Alfabetisk", "name_ASC"],
  ["Reversert alfabetisk", "name_DESC"]
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Siste nytt");

  const handleClick = event => {
    setOpenMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleMenuClick = e => {
    setActiveFilter(filterList[e.currentTarget.dataset.div_index][0]);
    props.setOrderBy(filterList[e.currentTarget.dataset.div_index][1]);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Sorter på">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="default"
          onClick={handleClick}
          endIcon={<FilterList />}
          size="large"
          data-cy="drop"
        >
          {activeFilter}
        </Button>
      </Tooltip>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={openMenu}
        onClose={handleClose}
        data-cy="shopping"
      >
        {filterList.map((el, index) => {
          return (
            <StyledMenuItem
              key={index}
              data-div_index={index}
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
  mapStateToProps,
  mapDispatchToProps
)(FilterMenu);
