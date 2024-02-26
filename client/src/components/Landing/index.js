import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Grid,
  Box,
} from '@mui/material';
import {Link} from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <AppBar position="static" style={{backgroundColor: '#4caf50'}}>
        <Toolbar>
          {/* <Button variant="h6" component={Link} to="/Discover" color="inherit">
            Plan Meals
          </Button>
          <Button variant="h6" component={Link} to="/Recipes" color="inherit">
            Discover Recipes
          </Button>
          <Button
            variant="h6"
            component={Link}
            to="/ShoppingList"
            color="inherit"
          >
            Shopping List
          </Button> */}
          <Button variant="h6" component={Link} to="/SignIn" color="inherit">
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          backgroundColor: '#8bc34a',
          color: 'white',
          pt: '8rem',
          pb: '4rem',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Meal Planner
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
          Plan, Cook, and Enjoy Delicious Meals
        </Typography>
      </Box>
      <Container maxWidth="md" style={{marginTop: '2rem'}}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary">
              Plan Your Meals
            </Typography>
            <Typography>
              Easily plan your meals for the week ahead. Create customized meal
              plans based on your dietary preferences, nutritional goals, and
              schedule.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/Plan"
              color="primary"
              style={{marginTop: '1rem'}}
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary">
              Discover New Recipes
            </Typography>
            <Typography>
              Explore a wide variety of delicious recipes curated for you. Find
              recipes for every occasion, cuisine, and dietary restriction.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/Discover"
              color="primary"
              style={{marginTop: '1rem'}}
            >
              Explore Recipes
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary">
              Create a Shopping List
            </Typography>
            <Typography>
              Generate a shopping list based on your meal plan. Stay organized
              and ensure you have all the ingredients you need for your recipes.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/ShoppingList"
              color="primary"
              style={{marginTop: '1rem'}}
            >
              View Shopping List
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="primary">
              Share and Collaborate
            </Typography>
            <Typography>
              Share your meal plans with family and friends. Collaborate on meal
              ideas and create shared meal plans for special occasions.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/Share"
              color="primary"
              style={{marginTop: '1rem'}}
            >
              Share Your Plans
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Landing;
