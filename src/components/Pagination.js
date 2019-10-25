import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import "./../index.css";

export default function Pagination(props) {
  return (
    <div className="pagination-bar">
      <Button
        variant="contained"
        onClick={() => {
          props.navigateBackward();
          window.scrollTo(500, 500);
        }}
      >
        Forrige side
      </Button>
      <h2>{props.currentPage}</h2>
      <Button
        variant="contained"
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
