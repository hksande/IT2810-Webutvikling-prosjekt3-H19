import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBack from "@material-ui/icons/ArrowBackIos";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";
import "./../index.css";

export default function Pagination(props) {
  return (
    <div className="pagination-bar">
      <Button
        variant="contained"
        disabled={props.currentPage === 1}
        startIcon={<ArrowBack />}
        onClick={() => {
          props.navigateBackward();
          window.scrollTo(500, 500);
        }}
      >
        Forrige side
      </Button>
      <h2 style={{ margin: "15px 15px" }}>{props.currentPage}</h2>
      <Button
        variant="contained"
        endIcon={<ArrowForward />}
        onClick={() => {
          props.navigateForward();
          window.scrollTo(500, 500);
        }}
      >
        Neste side
      </Button>
    </div>
  );
}
