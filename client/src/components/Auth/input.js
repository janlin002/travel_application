import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField, Grid, InputAdornment, IconButton,
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Input({
  name, handleChange, label, half, autoFocus, type, handleShowPassword,
}) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        } : null}
      />
    </Grid>
  );
}

export default Input;

Input.defaultProps = {
  half: false,
  autoFocus: false,
  type: '',
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  half: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  handleShowPassword: PropTypes.func.isRequired,
};
