import React from 'react';
import {TextField} from '@mui/material';

function EmailInput({email, handleEmailChange}) {
  return (
    <TextField
      name="email"
      label="Email"
      type="email"
      value={email}
      onChange={handleEmailChange}
      className="input"
      fullWidth
      required
    />
  );
}

export default EmailInput;
