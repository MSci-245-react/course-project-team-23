import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from '../Landing';
import Discover from '../Discover';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import PasswordForget from '../PasswordForget';
import {Typography, Grid, Button, Box} from '@mui/material/';

const App = () => {
  return (
    <div>
      <Router>
        <div style={{margin: '0px', color: 'Black'}}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/Discover" element={<Discover />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/PasswordForget" element={<PasswordForget />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
