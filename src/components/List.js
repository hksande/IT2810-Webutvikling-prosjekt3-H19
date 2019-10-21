import React, {useState} from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./../index.css";

export default function ControlledExpansionPanels(props) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleIncrement(e) {
    props.incrementCount(e.currentTarget.dataset.div_id);
    e.preventDefault();
  }

  function handleDecrement(e) {
    props.decrementCount(e.currentTarget.dataset.div_id);
    e.preventDefault();
  }

  return (
    <div className="list">
      {props.content.map((el, index) => {
        return (
          <ExpansionPanel
            expanded={expanded === index}
            onChange={handleChange(index)}
            key={el.id}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className="grid-container">
                <h3 className="list-header">{el.header}</h3>
                <h5 className="list-price">{el.price}</h5>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="grid-container-expansion-panel">
                <div className="purchase-info yellow-border">
                  <p>Kr. 193,20</p>
                  <p>Kan bestilles til alle butikker</p>
                  <p>Post/på dør: kan bestilles</p>
                </div>
                <p className="yellow-border">{el.description}</p>
                <div className="yellow-border add-to-cart">
                  <IconButton
                    variant="contained"
                    color="primary"
                    data-div_id={el.id}
                    onClick={handleDecrement}
                    disabled={el.count === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <h2>{el.count}</h2>
                  <IconButton
                    variant="contained"
                    color="primary"
                    data-div_id={el.id}
                    onClick={handleIncrement}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}
