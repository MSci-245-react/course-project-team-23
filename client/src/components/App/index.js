import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from '../Landing';
import Discover from '../Discover';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import PasswordForget from '../PasswordForget';
import UserInfo from '../UserInfo';
import Firebase, {FirebaseContext} from '../Firebase';

import {Typography, Grid, Button, Box} from '@mui/material/';

const App = () => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      <div>
        <Router>
          <div style={{margin: '0px', color: 'Black'}}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/Discover" element={<Discover />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/PasswordForget" element={<PasswordForget />} />
              <Route path="/UserInfo" element={<UserInfo />} />
            </Routes>
          </div>
        </Router>
      </div>
    </FirebaseContext.Provider>
  );
};

export default App;
