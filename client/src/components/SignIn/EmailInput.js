import React from 'react';
import {TextField} from '@mui/material';

function EmailInput({email, handleEmailChange}) {
  return (
    <TextField
      label="@UserName"
      variant="outlined"
      value={email}
      onChange={handleEmailChange}
      className="formField"
      fullWidth
    />
  );
}

export default EmailInput;
