import React, {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import {TextField, Button, Typography, Box} from '@mui/material';
import NameBox from './NameBox';
import EmailBox from './EmailBox';
import GoalBox from './GoalBox';
import WeightBox from './WeightBox';
import AgeBox from './AgeBox';
import '../../styling/UserInfo.css';

const UserInfo = () => {
  const firebase = useContext(FirebaseContext);
  //var curUserID = firebase.userID; // Replace with the current user's ID
  const [curUserID, setCurUserID] = useState(firebase.userID); // Replace with the current user's ID
  const serverURL = ''; // Define your server URL here

  useEffect(() => {
    console.log('user refreshed the page');
    setCurUserID(firebase.userID);
    //curUserID = firebase.userID;
  }, []);

  const [initialFormData, setInitialFormData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: '',
    goals: '',
    UID: curUserID,
  });
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = event => {
    const {name, value} = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loadUserInfo = () => {
    callApiLoadUserInfo().then(res => {
      console.log('callApiLoadUserInfo response: ', res);
      //var parsed = JSON.parse(res.express);
      console.log('callApiLoadUserInfo parse:', res[0]);
      var user = res[0];
      const loadedFormData = {
        name: user.name,
        email: user.email,
        weight: user.weight,
        goals: user.goals,
        UID: curUserID,
      };
      setFormData(loadedFormData);
      setInitialFormData(loadedFormData);
    });
  };

  const callApiLoadUserInfo = async () => {
    const url = serverURL + '/api/loadUserInfo';
    console.log('Sending to the api User ID: ', curUserID);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({uid: curUserID}),
    });
    //console.log('Response: ', response);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };

  useEffect(() => {
    loadUserInfo();
  }, [curUserID]);

  const updateUserInfo = formData => {
    callApiUpdateUserInfo(formData).then(res => {
      console.log('callApiUpdateUserInfo response: ', res);
    });
  };

  const callApiUpdateUserInfo = async formData => {
    const url = serverURL + '/api/updateUserInfo';
    console.log('Sending to the api Form Data: ', formData);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };

  const handleSubmit = event => {
    event.preventDefault();
    //updateUserInfo(formData);
    setIsEditable(false); // Exit edit mode after submission
    setInitialFormData(formData); // Update initialFormData with the newly submitted data
    updateUserInfo(formData);
  };

  const handleEdit = () => setIsEditable(true);

  const handleCancel = () => {
    setFormData(initialFormData); // Reset to initial form data
    setIsEditable(false); // Exit edit mode
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{mt: 1}}
      className="userInfoForm"
    >
      <Typography variant="h6">User Information</Typography>
      <NameBox
        name={formData.name}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <EmailBox
        email={formData.email}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <WeightBox
        weight={formData.weight}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <GoalBox
        goals={formData.goals}
        handleChange={handleChange}
        isEditable={isEditable}
      />
      <Box
        sx={{display: 'flex', justifyContent: 'space-between', mt: 3, mb: 2}}
      >
        {isEditable ? (
          <Button onClick={handleCancel} variant="outlined">
            Cancel
          </Button>
        ) : (
          <Button onClick={handleEdit} variant="outlined">
            Edit
          </Button>
        )}
        <Button type="submit" variant="contained" disabled={!isEditable}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
