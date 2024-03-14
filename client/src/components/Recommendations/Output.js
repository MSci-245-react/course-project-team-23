import React from 'react';
import {Box, Typography} from '@mui/material';
const Output = ({recommendations}) => {
  return (
    <Box sx={{maxHeight: '200px', overflowY: 'auto', flexGrow: 1, mt: 3}}>
      {recommendations.length > 0 ? (
        recommendations.map((recommendation, index) => (
          <Typography key={index}>{recommendation['Food Product']}</Typography>
        ))
      ) : (
        <Typography align="center">No recommendations</Typography>
      )}
    </Box>
  );
};

export default Output;
