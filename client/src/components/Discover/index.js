import React, {useState, useEffect} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {Link} from 'react-router-dom';
import RatingForm from './RatingForm'; // Import the rating form component
import NavBar from '../Navigation/NavBar';
import TopRatedMeals from './TopRatedMeals'; // Import the top-rated meals component

const PlanningPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allFoodIngredients, setAllFoodIngredients] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null); // Track the selected meal for rating
  const [openRatingForm, setOpenRatingForm] = useState(false); // State to control the visibility of the rating form

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
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  // Function to handle search submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Filter food ingredients based on search query
    const results = allFoodIngredients.filter(
      ingredient =>
        ingredient['Food Product']
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        ingredient['Main Ingredient']
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      // Add additional fields here for searching
    );
    setSearchResults(results);
  };

  // Function to handle opening rating form
  const handleOpenRatingForm = meal => {
    setSelectedMeal(meal);
    setOpenRatingForm(true);
  };

  // Function to handle closing rating form
  const handleCloseRatingForm = () => {
    setSelectedMeal(null);
    setOpenRatingForm(false);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" sx={{marginTop: '2rem', marginBottom: '2rem'}}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{fontWeight: 'bold', marginBottom: '1rem'}}
        >
          Plan Your Meals
        </Typography>
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search for recipes"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    backgroundColor: '#fff',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.primary',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSearchSubmit}
                sx={{
                  height: '100%',
                  borderRadius: '20px',
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontSize: '1rem',
                }}
              >
                Search
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2,
                  p: 2,
                  minHeight: '150px', // Adjust based on content
                  maxHeight: '400px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                }}
              >
                {searchResults.length > 0 ? (
                  <>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{fontWeight: 'bold'}}
                    >
                      Search Results
                    </Typography>
                    <List sx={{width: '100%'}}>
                      {searchResults.map((result, index) => (
                        <ListItem
                          key={index}
                          divider
                          button
                          onClick={() => handleOpenRatingForm(result)}
                          sx={{'&:hover': {bgcolor: 'action.hover'}}}
                        >
                          <ListItemText
                            primary={result['Food Product']}
                            secondary={`Main Ingredient: ${result['Main Ingredient']}`}
                            primaryTypographyProps={{fontWeight: 'medium'}}
                            secondaryTypographyProps={{color: 'text.secondary'}}
                          />
                          <Rating
                            name={`rating-${index}`}
                            value={result.rating} // Assuming the meal object has a 'rating' field
                            readOnly
                          />
                        </ListItem>
                      ))}
                    </List>
                  </>
                ) : (
                  <Typography variant="body1" sx={{color: 'text.secondary'}}>
                    No search results yet.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
        {/* Other components and JSX */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: '#ffffff',
            borderRadius: 2,
            p: 2,
            marginBottom: '2rem',
          }}
        >
          <TopRatedMeals meals={allFoodIngredients} /> {/* Render TopMeals component */}
        </Paper>
      </Container>
      {/* Rating Form Dialog */}
      <Dialog open={openRatingForm} onClose={handleCloseRatingForm}>
        <DialogTitle>
          Rate Meal: {selectedMeal && selectedMeal['Food Product']}
        </DialogTitle>
        <DialogContent>
          {selectedMeal && (
            <RatingForm meal={selectedMeal} onClose={handleCloseRatingForm} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanningPage;
