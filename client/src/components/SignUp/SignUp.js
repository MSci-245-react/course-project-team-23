import React from 'react';
import {Typography, Button} from '@mui/material';
import '../../styling/SignUp.css';
import {useNavigate} from 'react-router-dom';
import {auth, googleProvider, signInWithPopup} from '../Firebase/firebase';

function SignUp() {
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      // On successful sign-up, navigate to the Dashboard or another route as needed
      navigate('../Discover'); // Adjust this route as needed
    } catch (error) {
      console.error('Error during Google sign-up:', error);
      navigate('../SignUp');
      // Optionally handle errors here, such as displaying an error message to the user
    }
  };

  return (
    <div className="signUpContainer">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Button onClick={handleGoogleSignUp} className="button google-sign-up">
        Sign Up with Google
      </Button>
      <Typography variant="subtitle1" style={{marginTop: '20px'}}>
        Already have an account?
      </Typography>
      <Button onClick={() => navigate('../SignIn')} className="button">
        Log In
      </Button>
    </div>
  );
}

export default SignUp;
