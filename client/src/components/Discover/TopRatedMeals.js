// TopRatedMeals.js
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, Rating } from '@mui/material';

const TopRatedMeals = () => {
  const [topRatedMeals, setTopRatedMeals] = useState([]);

  useEffect(() => {
    // Fetch top-rated meals from backend API
    fetch('/api/topRatedMeals')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const normalizedMeals = data.map(meal => ({
          ...meal,
          avg_rating: Math.min(Math.max(parseFloat(meal.avg_rating), 0), 5)
        }));
        setTopRatedMeals(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Top Reviewed Meals
      </Typography>
      <List sx={{ width: '100%' }}>
        {topRatedMeals.map((meal, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={meal['name']}
              secondary={`Rating: ${meal.avg_rating}`}
              primaryTypographyProps={{ fontWeight: 'medium' }}
              secondaryTypographyProps={{ color: 'text.secondary' }}
            />
            <Rating
              name={`top-rated-${index}`}
              value={meal.avg_rating}
              readOnly
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TopRatedMeals;
