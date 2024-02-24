import React from 'react';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh'; // Icon for generating new password

function PasswordInput({
  password,
  handlePasswordChange,
  showPassword,
  setShowPassword,
  generatePassword,
}) {
  return (
    <TextField
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handlePasswordChange}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton
              aria-label="generate new password"
              onClick={generatePassword}
              edge="end"
            >
              <RefreshIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
