import {TextField, Button, Typography, Box} from '@mui/material';
import React, {useContext, useState} from 'react';

function AgeBox({age, handleChange, isEditable}) {
  <TextField
    margin="normal"
    required
    fullWidth
    name="age"
    label="Age"
    type="number"
    id="age"
    autoComplete="age"
    value={age}
    onChange={handleChange}
    disabled={!isEditable}
  />;
}

export default AgeBox;
