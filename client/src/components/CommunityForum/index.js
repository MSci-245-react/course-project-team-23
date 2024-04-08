import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Button, TextField, Paper } from '@mui/material';
import NavBar from '../Navigation/NavBar';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  select: {
    width: '100%',
    marginBottom: '20px',
  },
  textField: {
    marginBottom: '20px',
  },
  paper: {
    padding: '20px',
    marginTop: '20px',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
    borderRadius: '20px',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
    maxHeight: '400px', // Set a max height for scrolling
    overflowY: 'auto', // Enable vertical scrolling
  },
  forumItem: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '10px',
    background: '#FFFFFF',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  mealName: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
}));

const Forum = () => {
  const classes = useStyles();
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    fetchMeals();
    fetchForumPosts();
  }, []);

  const fetchMeals = () => {
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
  };

  const fetchForumPosts = () => {
    fetch('/api/forumPosts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch forum posts');
        }
        return response.json();
      })
      .then(data => {
        setForumPosts(data);
      })
      .catch(error => {
        console.error('Error fetching forum posts:', error);
      });
  };

  const handleChange = (selectedOption) => {
    setSelectedMeal(selectedOption);
  };

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = () => {
    if (selectedMeal && reviewText) {
      fetch('/api/submitPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodProductName: selectedMeal.label,
          reviewText: reviewText,
        }),
      })
        .then(response => {
          if (response.ok) {
            setSelectedMeal(null);
            setReviewText('');
            fetchForumPosts();
          } else {
            console.error('Failed to submit review');
          }
        })
        .catch(error => {
          console.error('Error submitting review:', error);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="md" className={classes.container}>
        <Typography variant="h4" align="center" gutterBottom color="white">
          Forum
        </Typography>
        <Select
          className={classes.select}
          value={selectedMeal}
          onChange={handleChange}
          options={meals.map(meal => ({
            value: meal.id,
            label: meal['Food Product']
          }))}
          placeholder="Select a meal..."
          isSearchable
        />
        <TextField
          className={classes.textField}
          label="Write your review"
          multiline
          rows={4}
          variant="outlined"
          value={reviewText}
          onChange={handleReviewTextChange}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitReview}
          disabled={!selectedMeal || !reviewText}
        >
          Submit Review
        </Button>
        <Paper className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            Forum Posts
          </Typography>
          {forumPosts.map((post, index) => (
            <Paper className={classes.forumItem} key={index}>
              <Typography variant="body1" className={classes.mealName}>{post['Food Product']}</Typography>
              <Typography variant="body2">Review: {post.review_text}</Typography>
            </Paper>
          ))}
        </Paper>
      </Container>
    </div>
  );
};

export default Forum;
