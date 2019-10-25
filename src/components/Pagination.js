import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";

import { connect } from "react-redux";
import { setPage } from "../actions/index";

import "./../index.css";

function mapStateToProps(state) {
  return {
    page: state.pagination.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPage: change => {
      dispatch(setPage({ change }));
    }
  };
}

function Pagination(props) {
  useEffect(() => {
    props.navigate();
  }, [props.page]);

  return (
    <div className="pagination-bar">
      <Button
        variant="contained"
        disabled={props.page === 1}
        startIcon={<ArrowBack />}
        onClick={() => {
          props.setPage(-1);
          window.scrollTo(500, 500);
        }}
      >
        Forrige side
      </Button>
      <h2 style={{ margin: "15px 15px" }}>{props.page}</h2>
      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        onClick={() => {
          props.setPage(1);
          window.scrollTo(500, 500);
        }}
      >
        Neste side
      </Button>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
