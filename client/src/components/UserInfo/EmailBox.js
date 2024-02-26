import {TextField, Button, Typography, Box} from '@mui/material';
import React, {useContext, useState} from 'react';

function EmailBox({email}) {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={email}
      disabled // Disable the input if you don't want it to be editable
    />
  );
}

export default EmailBox;
