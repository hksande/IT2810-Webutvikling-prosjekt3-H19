import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

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

export default function Searchbar() {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function search() {
    console.log(searchValue);
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Søk drikkevarer"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchValue}
        onChange={handleSearchChange}
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
