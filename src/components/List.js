import React, { useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import "./../index.css";

export default function ControlledExpansionPanels(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleIncrement(e) {
    props.changeCount(e.currentTarget.dataset.div_name, 1);
    e.preventDefault();
  }

  function handleDecrement(e) {
    props.changeCount(e.currentTarget.dataset.div_name, -1);
    e.preventDefault();
  }

  return (
    <div className="list">
      {props.content.map((el, index) => {
        return (
          <ExpansionPanel
            expanded={expanded === index}
            onChange={handleChange(index)}
            key={el.name}
            data-cy = "expansion"
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="grid-container-product-summary">
                <img src={el.img} className="product-image"></img>
                <div
                  style={{
                    overflow: "hidden"
                  }}
                >
                  <h3 className="product-name">{el.name}</h3>
                  <p>
                    <i>Kr. {el.price}</i>
                  </p>
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Divider />
              <div className="grid-container-product-details ">
                <p className="product-origin">
                  <b>Land: </b> {el.origin}
                </p>
                <div className="product-add">
                  <Tooltip title="Legg til i handlekurv">
                    <IconButton
                      variant="contained"
                      color="primary"
                      data-div_name={el.name}
                      onClick={handleIncrement}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                  <h2>{el.name in props.drinks ? props.drinks[el.name] : 0}</h2>
                  <Tooltip title="Fjern fra handlekurv">
                    <IconButton
                      variant="contained"
                      color="primary"
                      data-div_name={el.name}
                      onClick={handleDecrement}
                      disabled={
                        !(el.name in props.drinks) ||
                        props.drinks[el.name] === 0
                      }
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <p className="product-description">
                  <b>Smak: </b>
                  <i>{el.description}</i>
                </p>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}
