import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

export default function Checkboxes() {
  const [state, setState] = React.useState({
    checked_rodvin: false,
    checked_hvitvin: false,
    checked_mussvin: false,
    checked_ol: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked_rodvin}
            onChange={handleChange("checked_rodvin")}
            value="checked_rodvin"
          />
        }
        label="Rødvin"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked_hvitvin}
            onChange={handleChange("checked_hvitvin")}
            value="checked_hvitvin"
          />
        }
        label="Hvitvin"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked_mussvin}
            onChange={handleChange("checked_mussvin")}
            value="checked_mussvin"
          />
        }
        label="Musserende vin"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={state.checked_ol}
            onChange={handleChange("checked_ol")}
            value="checked_ol"
          />
        }
        label="Øl"
      />
    </FormGroup>
  );
}
