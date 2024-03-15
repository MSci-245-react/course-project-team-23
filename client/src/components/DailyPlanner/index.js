
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Button, Paper, Card, CardContent, Grid, IconButton } from '@mui/material';
import NavBar from '../Navigation/NavBar';
import Summary from './Summary'; // Import the SummaryPage component
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StarIcon from '@mui/icons-material/Star';


const useStyles = makeStyles(() => ({
  select: {
    width: '100%',
    marginBottom: '20px',
  },
  paper: {
    padding: '20px', // Add padding
    marginTop: '20px',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)', // Light gradient background
    borderRadius: '20px', // Rounded corners
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', // Add box shadow
  },
  mealCard: {
    marginBottom: '20px',
    minHeight: '210px', // Adjust min height
    minWidth: '250px', // Adjust min width
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '20px', // Rounded corners
    background: '#FFFFFF', // White background
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Add box shadow
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
    },
  },
  mealContentTitle: {
    fontWeight: 'bold', // Increase font weight
    marginBottom: '5px', // Adjust margin
    color: '#333333', // Dark text color
    textAlign: 'center', // Center align text
  },
  mealContent: {
    color: '#555555', // Dark text color
    textAlign: 'center', // Center align text
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: 'white', // White text color
    textAlign: 'center', // Center align text
  },
  addButton: {
    backgroundColor: 'green', // Orange button color
    color: '#FFFFFF', // White text color
    '&:hover': {
      backgroundColor: '#FFB740', // Lighter orange on hover
    },
  },
  removeButton: {
    color: '#FF6B6B', // Red text color
    '&:hover': {
      color: '#FF4444', // Lighter red on hover
    },
  },
  starIcon: {
    color: 'gold', // Star color
    fontSize: '16px', //
  },
}));

const MealDropdown = () => {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedMealsList, setSelectedMealsList] = useState([]);
  const [showSummary, setShowSummary] = useState(false); // State to toggle summary page

  useEffect(() => {
    // Fetch meals from the backend API
    fetch('/api/foodIngredients')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch meals');
        }
        return response.json();
      })
      .then(data => {
        setMeals(data);
      })
      .catch(error => {
        console.error('Error fetching meals:', error);
      });
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedMeal(selectedOption);
  };

  const handleAddMeal = () => {
    if (selectedMeal) {
      setSelectedMealsList([...selectedMealsList, selectedMeal]);
      setSelectedMeal(null);
    }
  };

  const handleRemoveMeal = (index) => {
    const updatedMealsList = [...selectedMealsList];
    updatedMealsList.splice(index, 1);
    setSelectedMealsList(updatedMealsList);
  };
  const renderStars = (level) => {
    const stars = [];
    for (let i = 0; i < level; i++) {
      stars.push(<StarIcon key={i} className={classes.starIcon} />);
    }
    return stars;
  };


  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" className={classes.title}>
          Daily Meal Planner
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '20px', color: 'white' }}>
          Welcome to the Daily Meal Planner! Here's how you can use this planner to organize your meals:
        </Typography>
        <ol style={{ paddingLeft: '20px', color: 'white' }}>
          <li style={{ marginBottom: '10px' }}>Select a meal from the dropdown menu.</li>
          <li style={{ marginBottom: '10px' }}>Click the "Add Meal" button to add the selected meal to your planner.</li>
          <li style={{ marginBottom: '10px' }}>You can remove a meal by clicking the delete icon on the meal card.</li>
          <li style={{ marginBottom: '10px' }}>To view a summary of your meal plan, click the "Show Summary" button.</li>
        </ol>
        <Select
          className={classes.select}
          value={selectedMeal}
          onChange={handleChange}
          options={meals.map(meal => ({
            value: meal.id,
            label: meal['Food Product'],
            mainIngredient: meal['Main Ingredient'],
            calories: meal['Calories'],
            carbs: meal['Carbs'],
            protein: meal['Protein'],
            fats: meal['Fats'],
            prepTime: meal['Prep Time'],
            cooking: meal['Cooking Skill'],
            cost: parseFloat(meal['Cost']).toFixed(2),
          }))}
          placeholder="Select a meal..."
          isSearchable
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.addButton}
          onClick={handleAddMeal}
          startIcon={<AddCircleOutlineIcon />}
        >
          Add Meal
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '10px' }}
          onClick={() => setShowSummary(!showSummary)}
        >
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </Button>
        {showSummary && <Summary selectedMealsList={selectedMealsList} />} {/* Show SummaryPage if showSummary is true */}
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom></Typography>
          <Grid container spacing={2}>
            {selectedMealsList.map((meal, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className={classes.mealCard}>
                  <CardContent>
                    <Typography variant="h6" className={classes.mealContentTitle}>{meal.label}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Calories: {meal.calories}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Carbs: {meal.carbs}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Protein: {meal.protein}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Fats: {meal.fats}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Prep Time: {meal.prepTime} mins</Typography>
                    <Typography className={classes.mealContent} variant="body2">Cost:  ${meal.cost}</Typography>
                    <Typography className={classes.mealContent} variant="body2">Skill Level: {renderStars(meal.cooking)}</Typography>
                  </CardContent>
                  <IconButton
                    className={classes.removeButton}
                    onClick={() => handleRemoveMeal(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default MealDropdown;
