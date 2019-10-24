import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Header(props) {
  return (
    <div className="header-container">
      <Typography variant="h3">
        <div className="header" style={{ color: "white", marginTop: "40px" }}>
          Vinmonopolet
        </div>
      </Typography>

    </div>
  );
}
