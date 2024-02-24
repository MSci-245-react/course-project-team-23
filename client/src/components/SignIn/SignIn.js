import React from 'react';
import {Typography, Button} from '@mui/material';
import '../../styling/SignIn.css';
import {useNavigate} from 'react-router-dom';

function SignIn() {
  let navigate = useNavigate();

  const handleGoogleSignIn = event => {
    // TODO: Implement your Google Sign-In logic here
  };

  const handleCreateAccount = event => {
    navigate('../SignUp');
  };

  return (
    <div className="signInContainer">
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      <div className="buttonRow">
        <Button onClick={handleGoogleSignIn} className="button google-sign-up">
          Sign In with Google
        </Button>
      </div>
      <Typography variant="subtitle1">Don't have an account?</Typography>
      <Button onClick={handleCreateAccount} className="button">
        Sign Up
      </Button>
    </div>
  );
}

export default SignIn;
