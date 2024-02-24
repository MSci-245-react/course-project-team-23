import {React, useState} from 'react';
import {Typography, Button} from '@mui/material';
import '../../styling/SignUp.css';
import {useNavigate} from 'react-router-dom';
import {
  auth,
  googleProvider,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from '../Firebase/firebase';
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
  const [error, setError] = useState({
    google: [false, ''],
  });
  const navigate = useNavigate();

  const handleGoogleSignUp = event => {
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
            !additionalInfo.isNewUser,
            !additionalInfo.isNewUser ? 'Account Already Exists' : '',
          ],
        });
        if (additionalInfo.isNewUser) {
          console.log('Creating new user');
          navigate('../Discover');
        } else {
          console.log('User already exists');
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

  return (
    <div className="signUpContainer">
      <Typography variant="h4" className="signUpTitle" gutterBottom>
        Meal Stream
      </Typography>
      <Typography variant="subtitle1" className="signUpSubtitle" gutterBottom>
        Your Meal Planner Companion
      </Typography>
      <Button
        onClick={handleGoogleSignUp}
        className="button google-sign-up"
        variant="contained"
        style={{
          backgroundColor: '#ff4b2b',
          color: 'white',
          textTransform: 'none',
        }}
        startIcon={<GoogleIcon />}
      >
        Sign Up with Google
      </Button>
      {error.google[0] && (
        <Typography className="errorText">{error.google[1]}</Typography>
      )}
      <Typography variant="subtitle1" className="logInPrompt">
        Already have an account?
      </Typography>
      <Button
        onClick={() => navigate('../SignIn')}
        className="button logInButton"
        variant="contained"
        style={{backgroundColor: '#4285f4', color: 'white'}}
      >
        Log In
      </Button>
    </div>
  );
}

export default SignUp;
