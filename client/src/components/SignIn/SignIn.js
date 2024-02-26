import {React, useState} from 'react';
import {Typography, Button} from '@mui/material';
import '../../styling/SignIn.css';
import {useNavigate} from 'react-router-dom';
import Firebase from '../Firebase';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {
  const [error, setError] = useState({
    google: [false, ''],
  });
  const navigate = useNavigate();

  const handleGoogleSignIn = event => {
    Firebase.signUpOrInWithPopupGoogle('SignIn')
      .then(({userExists, user}) => {
        console.log('User Found');
        navigate('../Discover');
      })
      .catch(error => {
        setError(prevError => ({
          ...prevError,
          google: [true, error.message],
        }));
      });
  };

  return (
    <div className="signInContainer">
      <Typography variant="h4" className="loginTitle" gutterBottom>
        Meal Stream
      </Typography>
      <Typography variant="h6" className="loginSubtitle" gutterBottom>
        Your Meal Planner Companion
      </Typography>
      <Button
        onClick={handleGoogleSignIn}
        className="button google-sign-in"
        style={{
          backgroundColor: '#ff4b2b',
          color: 'white',
          textTransform: 'none',
        }}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Sign In with Google
      </Button>
      {error.google[0] && (
        <Typography className="errorText">{error.google[1]}</Typography>
      )}
      <Typography variant="subtitle1" className="signUpPrompt">
        Don't have an account?
      </Typography>
      <Button
        onClick={() => navigate('../SignUp')}
        className="button signUpButton"
        style={{backgroundColor: '#4285f4', color: 'white'}}
        variant="contained"
      >
        Sign Up
      </Button>
    </div>
  );
}

export default SignIn;
