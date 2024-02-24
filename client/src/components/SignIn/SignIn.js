import {React, useState} from 'react';
import {Typography, Button} from '@mui/material';
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
        {error.google[0] && (
          <Typography className="errorText">{error.google[1]}</Typography>
        )}
      </div>
      <Typography variant="subtitle1">Don't have an account?</Typography>
      <Button onClick={handleCreateAccount} className="button">
        Sign Up
      </Button>
    </div>
  );
}

export default SignIn;
