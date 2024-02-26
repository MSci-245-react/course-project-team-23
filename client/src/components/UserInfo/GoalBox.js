import {TextField, Button, Typography, Box} from '@mui/material';
import React, {useContext, useState} from 'react';

function GoalBox({goals, handleChange, isEditable}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="goals"
      label="Goals"
      id="goals"
      autoComplete="goals"
      value={goals}
      onChange={handleChange}
      disabled={!isEditable}
      multiline // Enable multiline input
      rows={4} // Set the number of rows to make it look like a rectangular box
      inputProps={{maxLength: 200}} // Set the maximum number of characters to 200
    />
  );
}

export default GoalBox;
