import React, {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import {TextField, Button, Typography, Box} from '@mui/material';

const Recommendations = () => {
  const firebase = useContext(FirebaseContext);
  //var curUserID = firebase.userID; // Replace with the current user's ID
  const [curUserID, setCurUserID] = useState(firebase.userID); // Replace with the current user's ID
  const serverURL = ''; // Define your server URL here

  useEffect(() => {
    console.log('user refreshed the page');
    setCurUserID(firebase.userID);
    //curUserID = firebase.userID;
  }, []);

  return (
    <div>
      <h1>Recommendations</h1>
    </div>
  );
};

export default Recommendations;
