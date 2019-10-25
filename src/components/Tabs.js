import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

import SearchBar from "./Searchbar";
import AllProductsContainer from "./AllProductsContainer";
import TopProductsContainer from "./TopProductsContainer";
import FilterMenu from "./FilterMenu";
import Category from "./Category";

import "./../index.css";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    typeFilter: state.filter.typeFilter
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="tab1">
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Drikkevarer" {...a11yProps(0)} />
          <Tab label="Mest populære" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="flex-container-products">
          <div className="category">
            <Category />
          </div>
          <div className="main">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "Jomolhari ,serif"
              }}
            >
              <div />
              <h1>
                {props.typeFilter === null
                  ? "Alle produkter"
                  : props.typeFilter}
              </h1>
              <Tooltip title="Handlekurv">
                <Badge badgeContent={props.count} color="secondary">
                  <IconButton
                    color="inherit"
                    aria-label="shopping-cart"
                    onClick={props.openDialog}
                  >
                    <ShoppingCartIcon />
                  </IconButton>
                </Badge>
              </Tooltip>
            </div>
            <div className="flex-container-search">
              <div className="searchBar">
                <SearchBar />
              </div>
              <div className="filterMenu">
                <FilterMenu />
              </div>
            </div>
            <AllProductsContainer changeCount={props.changeCount} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopProductsContainer />
      </TabPanel>
    </div>
  );
}

export default connect(mapStateToProps)(SimpleTabs);
