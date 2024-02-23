import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Discover from '../Discover'
import { Typography, Grid, Button, Box } from '@mui/material/';



const App = () => {
  return (
    <div>
      <Router >

        <div style = {{ margin: '0px', color: 'Black'}}>
          <Routes >
            <Route path="/" element={<Landing />} />
            <Route path="/Discover" element={<Discover />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

