import React, {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import AllergiesCheckBox from './AllergiesCheckBox';
import DietCheckBox from './DietCheckBox';
import IngredientsCheckBox from './IngredientsCheckBox';
import FoodCheckBox from './FoodCheckBox';
import NavBar from '../Navigation/NavBar';
import {
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Recommendations = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const firebase = useContext(FirebaseContext);
  const [curUserID, setCurUserID] = useState(firebase.userID);

  // States for user input and available options
  const [userInput, setUserInput] = useState({
    allergies: [],
    diet: [],
    ingredients: [],
    foodItems: [],
  });

  // Mock data for the demo
  const [allAllergies, setAllAllergies] = useState([
    'Gluten',
    'Peanut',
    'Seafood',
  ]);
  const [allDiets, setAllDiets] = useState(['Vegan', 'Ketogenic', 'Paleo']);
  const [allIngredients, setAllIngredients] = useState([
    'Chicken',
    'Beef',
    'Salmon',
  ]);
  const [allFoodItems, setAllFoodItems] = useState([
    'Pizza',
    'Burger',
    'Sushi',
  ]);

  useEffect(() => {
    console.log('User ID from Firebase:', curUserID);
    // Fetch and set the state for user's preferences
  }, [curUserID]);

  const handleSubmit = () => {
    console.log('User Preferences:', userInput);
    // Submit preferences to backend
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{my: 4, p: 3}}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color={theme.palette.primary.main}
          >
            Select Your Preferences
          </Typography>
          <Box mb={3}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Allergies</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <AllergiesCheckBox
                  allergies={allAllergies}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Diets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <DietCheckBox
                  diets={allDiets}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Ingredients</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <IngredientsCheckBox
                  ingredients={allIngredients}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography>Food Items</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FoodCheckBox
                  foodItems={allFoodItems}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              </AccordionDetails>
            </Accordion>
          </Box>

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth={!matches}
            size="large"
          >
            Submit Preferences
          </Button>
        </Paper>
      </Container>
    </>
  );
};

export default Recommendations;
