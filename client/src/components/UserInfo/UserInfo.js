import React, {useContext, useState} from 'react';
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
  const user = firebase.auth.currentUser;
  const serverURL = '';

  const [formData, setFormData] = useState({
    name: user ? user.displayName : '',
    email: user ? user.email : '',
    age: '',
    weight: '',
    goals: '',
    uid: user ? user.uid : '',
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
      var parsed = JSON.parse(res.express);
      console.log('callApiLoadUserInfo parse:', parsed);
      setFormData({
        name: parsed.name,
        email: parsed.email,
        age: parsed.age,
        weight: parsed.weight,
        goals: parsed.goals,
        uid: parsed.uid,
      });
    });
  };

  const callApiLoadUserInfo = async () => {
    const url = serverURL + '/loadUserInfo';
    //console.log('User UID: ', user.uid);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(user.uid),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };

  React.useEffect(() => {
    loadUserInfo();
  }, []);

  const updateUserInfo = formData => {
    callApiUpdateUserInfo(formData).then(res => {
      console.log('callApiUpdateUserInfo response: ', res);
    });
  };

  const callApiUpdateUserInfo = async formData => {
    const url = serverURL + '/updateUserInfo';
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
    console.log('Form data:', formData);
    updateUserInfo(formData);
    // You would typically handle the form submission here,
    // for example, sending the data to your database
  };

  const handleEdit = () => {
    setIsEditable(prev => !prev);
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
      <NameBox name={formData.name} />
      <EmailBox email={formData.email} />
      <AgeBox
        age={formData.age}
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
        <Button
          onClick={handleEdit}
          variant="outlined"
          sx={{mr: 1}} // Add right margin to separate the buttons
        >
          {isEditable ? 'Cancel' : 'Edit'}
        </Button>
        <Button type="submit" variant="contained" disabled={!isEditable}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default UserInfo;
