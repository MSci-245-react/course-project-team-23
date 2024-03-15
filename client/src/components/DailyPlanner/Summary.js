import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
    borderRadius: '8px',
    marginBottom: '20px',
    marginTop: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    padding: '20px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'black',
    fontSize: '1.5rem', // Increase font size
  },
  totalItem: {
    marginBottom: '5px',
    color: 'black',
    fontSize: '1.1rem', // Increase font size
  },
}));

const Summary = ({ selectedMealsList }) => {
  const classes = useStyles();

  // Calculate totals
  const totalCalories = selectedMealsList.reduce((total, meal) => total + meal.calories, 0);
  const totalCarbs = selectedMealsList.reduce((total, meal) => total + meal.carbs, 0);
  const totalProtein = selectedMealsList.reduce((total, meal) => total + meal.protein, 0);
  const totalFats = selectedMealsList.reduce((total, meal) => total + meal.fats, 0);
  const totalPrepTime = selectedMealsList.reduce((total, meal) => total + meal.prepTime, 0);
  const totalCost = selectedMealsList.reduce((total, meal) => total + parseFloat(meal.cost), 0);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div>
          <Typography variant="h6" className={classes.title}>
            Meal Plan Summary
          </Typography>
          <Typography variant="body1" className={classes.totalItem}>
            Total Calories: {totalCalories}
          </Typography>
          <Typography variant="body1" className={classes.totalItem}>
            Total Carbs: {totalCarbs}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" className={classes.totalItem}>
            Total Protein: {totalProtein}
          </Typography>
          <Typography variant="body1" className={classes.totalItem}>
            Total Fats: {totalFats}
          </Typography>
          <Typography variant="body1" className={classes.totalItem}>
            Total Prep Time: {totalPrepTime} mins
          </Typography>
          <Typography variant="body1" className={classes.totalItem}>
            Total Cost: ${parseFloat(totalCost).toFixed(2)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Summary;

