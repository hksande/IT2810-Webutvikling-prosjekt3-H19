import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';


export default function Checkboxes() {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    

  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    
      <FormGroup row>
              <FormControlLabel
                  control={
                  <Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
                  }
                  label="Rødvin"
              />
              <FormControlLabel
                  control={
                  <Checkbox checked={state.checkedB} onChange={handleChange('checkedB')} value="checkedB" />
                  }
                  label="Hvitvin"
              />
              <FormControlLabel
                  control={
                  <Checkbox checked={state.checkedC} onChange={handleChange('checkedC')} value="checkedC" />
                  }
                  label="Musserende vin"
              />
              <FormControlLabel
                  control={
                  <Checkbox checked={state.checkedD} onChange={handleChange('checkedD')} value="checkedD" />
                  }
                  label="Øl"
              />
      </FormGroup>
    
  );
}
    
