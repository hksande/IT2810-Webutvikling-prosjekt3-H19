import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { setSearch } from "./../actions/index";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    setSearch: searchString => {
      dispatch(setSearch({ searchString }));
    }
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: "3px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

function SearchBar(props) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      search();
    }
  }

  function handleSearchKeyPress(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  function search() {
    props.setSearch(searchValue);
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Søk drikkevarer"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchValue}
        onChange={handleSearchChange}
        onKeyPress={handleSearchKeyPress}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
