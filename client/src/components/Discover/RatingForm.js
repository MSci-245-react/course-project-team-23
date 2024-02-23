// RatingForm.js

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Rating } from '@mui/material';

const RatingForm = ({ meal, onClose }) => {
  const [rating, setRating] = useState(0); // State for the rating value

  // Function to handle rating change
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  // Function to handle form submission
// Function to handle form submission
// Function to handle form submission
const handleSubmit = () => {
    const now = new Date();
    const created_at = now.toISOString().slice(0, 19).replace('T', ' '); // Format datetime
    // Submit the rating to the backend
    fetch('/api/rateMeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: meal['Food Product'], // Assuming 'Food Product' is the meal name
        rating: rating,
        created_at: created_at, // Use formatted created_at value
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Rating submitted successfully');
        onClose(); // Close the form after successful submission
      } else {
        console.error('Failed to submit rating');
      }
    })
    .catch(error => {
      console.error('Error submitting rating:', error);
    });
  };
  
  

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Rate Meal: {meal && meal['Food Product']}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Description: {meal && meal['Description']}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Rating
          name="rating"
          value={rating}
          precision={0.5} // Allow half-star ratings
          onChange={(event, newValue) => setRating(newValue)}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Rating
      </Button>
    </Box>
  );
};

export default RatingForm;
