import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SearchBar from "./Searchbar";
import Checkboxes from "./Checkboxes";
import ProductsContainer from "./ProductsContainer";
import TopProductsContainer from "./TopProductsContainer";
import FilterMenu from "./FilterMenu";

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

export default function SimpleTabs(props) {
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
          <Tab label="Liste med alkohol" {...a11yProps(0)} />
          <Tab label="Mest kjøpte" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="flex-container-center">
          <SearchBar />
        </div>
        <Checkboxes />
        <FilterMenu />
        <br></br>
        <ProductsContainer changeCount={props.changeCount} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopProductsContainer />
      </TabPanel>
    </div>
  );
}
