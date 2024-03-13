import {React, useState} from 'react';
import {Typography, Button, IconButton} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styling/SignUp.css';
import {useNavigate} from 'react-router-dom';
import Firebase from '../Firebase';
import GoogleIcon from '@mui/icons-material/Google';

function SignUp() {
  const [error, setError] = useState({
    google: [false, ''],
  });
  const navigate = useNavigate();
  const serverURL = '';

  const handleGoogleSignUp = event => {
    Firebase.signUpOrInWithPopupGoogle('SignUp')
      .then(({userExists, user}) => {
        console.log(user);
        console.log('User Created');
        addUserToDatabase(user);
        navigate('../UserInfo');
      })
      .catch(error => {
        setError(prevError => ({
          ...prevError,
          google: [true, error.message],
        }));
      });
  };
  // const handleGoBack = () => {
  //   navigate(-1); // Navigate back to the previous landing page
  // };

  const addUserToDatabase = user => {
    callApiAddUserToDatabase(user);
  };

  const callApiAddUserToDatabase = async user => {
    const url = serverURL + '/api/addUser';
    console.log(url);
    const data = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.json();

      if (response.status !== 200) {
        throw new Error(responseBody.message);
      }

      console.log('Review sent: ', responseBody);
      return responseBody;
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <div className="signUpContainer">
      {/* <IconButton
        onClick={handleGoBack}
        style={{position: 'absolute', top: 270, left: 570}}
      >
        <ArrowBackIcon />
      </IconButton>       */}
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
