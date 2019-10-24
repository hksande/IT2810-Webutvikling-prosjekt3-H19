import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Filter_List from "@material-ui/icons/FilterList";
import { setOrderBy } from "./../actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setOrderBy: orderBy => {
      dispatch(setOrderBy({ orderBy }));
    }
  };
}

function mapStateToProps(state) {
  return {
    orderBy: state.products.orderBy
  };
}

const filterList = [
  ["------------", null],
  ["Pris stigende", "price_ASC"],
  ["Pris synkende", "price_DESC"],
  ["Navn stigende", "name_ASC"],
  ["Navn synkende", "name_DESC"]
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
  const [activeFilter, setActiveFilter] = React.useState("------------");

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = e => {
    setActiveFilter(filterList[e.currentTarget.dataset.div_index][0]);
    props.setOrderBy(filterList[e.currentTarget.dataset.div_index][1]);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="default"
        onClick={handleClick}
        endIcon={<Filter_List />}
        size="large"
      >
        {activeFilter}
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
