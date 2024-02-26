import {TextField, Button, Typography, Box} from '@mui/material';
import React, {useContext, useState} from 'react';

function WeightBox({weight, handleChange, isEditable}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="weight"
      label="Weight (in lbs)"
      type="number"
      id="weight"
      autoComplete="weight"
      value={weight}
      onChange={handleChange}
      disabled={!isEditable}
    />
  );
}

export default WeightBox;
