import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import NavBar from '../Navigation/NavBar';
import CookingTipIcon from '@mui/icons-material/EmojiFoodBeverage';
import HealthTipIcon from '@mui/icons-material/HealthAndSafety';

const Tips = () => {
  const cookingTips = [
    "Use fresh herbs to enhance the flavor of your dishes.",
    "Invest in good quality knives for easier and safer food preparation.",
    "Experiment with different cooking techniques like grilling, roasting, and sautéing.",
  ];

  const healthTips = [
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Incorporate more fruits and vegetables into your diet for added nutrients.",
    "Prioritize regular exercise to maintain a healthy lifestyle.",
  ];

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff' }}>
          Cooking Tips
        </Typography>
        <Grid container spacing={3}>
          {cookingTips.map((tip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ border: '2px solid #ccc', borderRadius: '10px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                  <CookingTipIcon style={{ fontSize: 48, marginBottom: '10px', color: '#FF5722' }} />
                  <Typography variant="body1" align="center">{tip}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#fff', marginTop: '40px' }}>
          Health Tips
        </Typography>
        <Grid container spacing={3}>
          {healthTips.map((tip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ border: '2px solid #ccc', borderRadius: '10px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <CardContent>
                  <HealthTipIcon style={{ fontSize: 48, marginBottom: '10px', color: '#4CAF50' }} />
                  <Typography variant="body1" align="center">{tip}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
      </Container>
    </div>
  );
};

export default Tips;
