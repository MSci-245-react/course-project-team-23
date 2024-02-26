import {TextField, Button, Typography, Box} from '@mui/material';
import React, {useContext, useState} from 'react';
function NameBox({name}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      autoComplete="name"
      value={name}
      disabled // Disable the input if you don't want it to be editable
    />
  );
}

export default NameBox;
