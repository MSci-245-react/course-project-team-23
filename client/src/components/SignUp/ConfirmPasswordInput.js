import React from 'react';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ConfirmPasswordInput({
  confirmPassword,
  handleConfirmPasswordChange,
  showConfirmationPassword,
  setShowConfirmationPassword,
}) {
  return (
    <TextField
      name="confirmPassword"
      label="Confirm Password"
      type={showConfirmationPassword ? 'text' : 'password'}
      value={confirmPassword}
      onChange={handleConfirmPasswordChange}
      className="input"
      fullWidth
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() =>
                setShowConfirmationPassword(!showConfirmationPassword)
              }
              edge="end"
            >
              {showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default ConfirmPasswordInput;
