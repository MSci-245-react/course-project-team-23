import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
import { Container, Grid, Typography, Card, CardContent, TextField, MenuItem } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  select: {
    width: '300px',
    margin: '0 auto',
  },
}));

const MealDropdown = () => {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    // Fetch meals from the backend API
    fetch('/api/meals')
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

  const options = meals.map(meal => ({
    value: meal.id,
    label: meal.name,
  }));

  return (
    <Select
      className={classes.select}
      value={selectedMeal}
      onChange={handleChange}
      options={options}
      placeholder="Select a meal..."
      isSearchable
    />
  );
};

export default MealDropdown;
