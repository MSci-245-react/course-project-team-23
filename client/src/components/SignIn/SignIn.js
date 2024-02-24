import React, {useState} from 'react';
import {Grid, Typography, Button} from '@mui/material';
import '../../styling/SignIn.css';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SignUp from '../SignUp';
import PasswordForget from '../PasswordForget';
import {Route, useNavigate} from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({...prevErrors, email: false}));
    setShowConfirmation(false);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    setErrors(prevErrors => ({...prevErrors, password: false}));
    setShowConfirmation(false);
  };

  const validPassword = password => {
    const hasAtLeastEightCharacters = /.{8,}/; // Checks for at least 8 characters
    const containsAtLeastOneLetter = /[A-Za-z]/; // Checks for at least one letter
    const containsAtLeastOneSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/; // Checks for at least one special character
    const containsNoSpaces = /^\S*$/; // Checks for no spaces

    // Validate password based on the criteria
    const isValid =
      hasAtLeastEightCharacters.test(password) &&
      containsAtLeastOneLetter.test(password) &&
      containsAtLeastOneSpecialCharacter.test(password) &&
      containsNoSpaces.test(password);

    return isValid;
  };

  const validEmail = email => {
    // This regex checks for a basic structure of an email address
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is not empty and contains "@" by relying on the regex
    return email.trim() !== '' && validEmailRegex.test(email);
  };

  const handleLogin = event => {
    let hasErrors = false;
    if (!validEmail(email)) {
      setErrors(prevErrors => ({...prevErrors, email: true}));
      hasErrors = true;
    }
    if (!validPassword(password)) {
      setErrors(prevErrors => ({...prevErrors, password: true}));
      hasErrors = true;
    }
    if (hasErrors) {
      setShowConfirmation(false);
    } else {
      // callApiLogin();
      setShowConfirmation(true);
      // send user to dashboard page
    }
  };

  const handleForgotPassword = event => {
    navigate('../PasswordForget');
  };

  const handleCreateAccount = event => {
    navigate('../SignUp');
  };

  const handleGoogleSignIn = event => {};

  return (
    <div className="signInContainer">
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        login here using your email and password
      </Typography>
      <EmailInput email={email} handleEmailChange={handleEmailChange} />
      {errors.email && (
        <Typography className="errorText">Please add valid email.</Typography>
      )}
      <PasswordInput
        password={password}
        handlePasswordChange={handlePasswordChange}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      {errors.password && (
        <Typography className="errorText">
          Please add valid password.
        </Typography>
      )}
      <div className="buttonRow">
        <Button onClick={handleLogin} className="button">
          Log In
        </Button>
        <Button onClick={handleGoogleSignIn} className="button google-sign-up">
          Sign In with Google
        </Button>
      </div>
      <div className="buttonRow">
        <Button onClick={handleForgotPassword} className="button">
          Forgot Password
        </Button>
        <Button onClick={handleCreateAccount} className="button">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
