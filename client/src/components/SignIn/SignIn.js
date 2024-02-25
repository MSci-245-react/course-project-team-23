import {React, useState} from 'react';
import {Typography, Button, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styling/SignIn.css';
import {useNavigate} from 'react-router-dom';
import {
  auth,
  googleProvider,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
} from '../Firebase/firebase';
import GoogleIcon from '@mui/icons-material/Google';

function SignIn() {
  const [error, setError] = useState({
    google: [false, ''],
  });
  const navigate = useNavigate();

  const handleGoogleSignIn = event => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        const additionalInfo = getAdditionalUserInfo(result);
        setError({
          ...error,
          google: [
            additionalInfo.isNewUser,
            additionalInfo.isNewUser ? 'Could Not Find Account' : '',
          ],
        });
        if (!additionalInfo.isNewUser) {
          console.log('Found User');
          navigate('../Discover');
        } else {
          console.log('Could not find user');
        }
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous landing page
  };

  return (
    <div className="signInContainer">
      <IconButton
        onClick={handleGoBack}
        style={{position: 'absolute', top: 280, left: 550}}
      >
        <ArrowBackIcon />
      </IconButton>
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
