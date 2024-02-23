import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button, Grid, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const PlanningPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allFoodIngredients, setAllFoodIngredients] = useState([]);

  useEffect(() => {
    // Fetch all food ingredients from backend API
    fetch('/api/foodIngredients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAllFoodIngredients(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    // Filter food ingredients based on search query
    const results = allFoodIngredients.filter(ingredient =>
      ingredient['Food Product'].toLowerCase().includes(searchQuery.toLowerCase()) ||
      ingredient['Main Ingredient'].toLowerCase().includes(searchQuery.toLowerCase())
      // Add additional fields here for searching
    );
    setSearchResults(results);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#4caf50' }}>
        <Toolbar>
          <Button variant="h6" component={Link} to="/" color="inherit">
            Landing
          </Button>
          <Button variant="h6" component={Link} to="/Recipes" color="inherit">
            Discover Recipes
          </Button>
          <Button variant="h6" component={Link} to="/ShoppingList" color="inherit">
            Shopping List
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h4" gutterBottom>Plan Your Meals</Typography>
        <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 8 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search for recipes"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSearchSubmit}
                sx={{ height: '100%' }}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ bgcolor: '#ffffff', borderRadius: 8, p: 2 }}>
                {searchResults.length > 0 ? (
                  <>
                    <Typography variant="h5" gutterBottom>Search Results</Typography>
                    <List>
                      {searchResults.map((result, index) => (
                        <ListItem key={index} divider>
                          <ListItemText
                            primary={result['Food Product']}
                            secondary={`Main Ingredient: ${result['Main Ingredient']}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                ) : (
                  <Typography variant="body1">No search results yet.</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default PlanningPage;
