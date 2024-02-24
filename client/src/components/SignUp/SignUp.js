import React, {useState} from 'react';
import {Typography, Button} from '@mui/material';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import ConfirmPasswordInput from './ConfirmPasswordInput';
import '../../styling/SignUp.css';
import {Route, useNavigate} from 'react-router-dom';

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    // You can add more fields if necessary
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Handle changes in the text fields
  const handleChange = event => {
    const {name, value} = event.target;
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors(prevErrors => {
      if (name === 'confirmPassword' && value !== userDetails.password) {
        return {...prevErrors, [name]: true};
      } else {
        return {...prevErrors, [name]: false};
      }
    });
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

  // Handle the form submission
  const handleSubmit = event => {
    event.preventDefault();
    let hasErrors = false;
    console.log(userDetails);
    if (!validEmail(userDetails.email)) {
      setErrors(prevErrors => ({...prevErrors, email: true}));
      hasErrors = true;
    }
    if (!validPassword(userDetails.password)) {
      setErrors(prevErrors => ({...prevErrors, password: true}));
      hasErrors = true;
    }
    if (userDetails.password !== userDetails.confirmPassword) {
      setErrors(prevErrors => ({...prevErrors, confirmPassword: true}));
      hasErrors = true;
    }
    if (hasErrors) {
      setShowConfirmation(false);
    } else {
      // callApiSignUp();
      setShowConfirmation(true);
      // After successful sign up, you might want to navigate to the sign-in page or dashboard
      // navigate('/signin');
    }
  };

  // The function to generate a random password
  const handleGeneratePassword = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    setUserDetails(prevDetails => ({
      ...prevDetails,
      password: password,
      confirmPassword: password,
    }));
  };

  const handleGoogleSignUp = () => {};

  return (
    <div className="signUpContainer">
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <EmailInput
          email={userDetails.email}
          handleEmailChange={e => handleChange(e)}
        />
        {errors.email && (
          <Typography className="errorText">Please add valid email.</Typography>
        )}
        <PasswordInput
          password={userDetails.password}
          handlePasswordChange={e => handleChange(e)}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          generatePassword={handleGeneratePassword}
        />
        {errors.password && (
          <Typography className="errorText">
            Please add valid password.
          </Typography>
        )}
        <ConfirmPasswordInput
          confirmPassword={userDetails.confirmPassword}
          handleConfirmPasswordChange={e => handleChange(e)}
          setShowConfirmationPassword={setShowConfirmationPassword}
          showConfirmationPassword={showConfirmationPassword}
        />
        {errors.confirmPassword && (
          <Typography className="errorText">Passwords do not match.</Typography>
        )}

        <div className="buttonRow">
          <Button type="submit" className="button">
            Sign Up
          </Button>
          <Button onClick={handleGeneratePassword} className="button">
            Generate Random Password
          </Button>
        </div>
        <div className="buttonRow">
          <Button
            onClick={handleGoogleSignUp}
            className="button google-sign-up"
          >
            Sign Up with Google
          </Button>
          <Button onClick={() => navigate('../SignIn')} className="button">
            Already have an account? Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
