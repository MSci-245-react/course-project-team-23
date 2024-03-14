import React, {useContext, useState, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import AllergiesCheckBox from './AllergiesCheckBox';
import DietCheckBox from './DietCheckBox';
import IngredientsCheckBox from './IngredientsCheckBox';
import FoodCheckBox from './FoodCheckBox';
import NavBar from '../Navigation/NavBar';
import Output from './Output';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

const Recommendations = () => {
  const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.up('md'));
  const firebase = useContext(FirebaseContext);
  const [curUserID, setCurUserID] = useState(firebase.userID);

  const serverURL = '';

  const [userInput, setUserInput] = useState({
    allergies: [],
    diet: [],
    ingredients: [],
  });

  const [recommendations, setRecommendations] = useState([]);

  const [allInfo, setAllInfo] = useState({
    allergies: [],
    diets: [],
    ingredients: [],
  });

  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleAccordionChange = panel => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    loadAllInfo();
  }, []);

  const loadAllInfo = () => {
    callApiLoadAllInfo().then(res => {
      console.log('callApiLoadAllInfo response: ', res);
      //var parsed = JSON.parse(res.express);
      const loadedFormData = {
        allergies: res.Allergens,
        diets: res.Diet_Category,
        ingredients: res.Main_Ingredient,
      };
      setAllInfo(loadedFormData);
    });
  };

  const callApiLoadAllInfo = async () => {
    const url = serverURL + '/api/foodInfo';
    console.log('finding ingredients');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response: ', response);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log('User settings: ', body);
    return body;
  };

  const loadRecommendations = userInput => {
    callApiLoadRecommendations(userInput)
      .then(res => {
        console.log('callApiLoadRecommendations: ', res);
        // Here, you set the API response to the recommendations state.
        setRecommendations(res);
      })
      .catch(error => {
        console.error('Failed to load recommendations:', error);
        // Optionally handle the error state here, e.g., setting recommendations to null or showing an error message.
      });
  };

  const callApiLoadRecommendations = async userInput => {
    const url = serverURL + '/api/recommendations';
    console.log('Sending to the api User Input: ', userInput);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      if (!response.ok) {
        // If the response is not OK, throw an error to catch it later
        const errorBody = await response.json();
        throw new Error(
          errorBody.message || 'Failed to fetch recommendations.',
        );
      }
      const body = await response.json();
      console.log('User settings: ', body);
      return body;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error; // Rethrowing the error to be caught by the caller
    }
  };

  const handleSubmit = () => {
    console.log('User Preferences:', userInput);
    const isUserInputEmpty = Object.values(userInput).every(value =>
      Array.isArray(value) ? value.length === 0 : !value,
    );
    if (!isUserInputEmpty) {
      loadRecommendations(userInput);
    } else {
      console.log('User input is empty');
      setRecommendations([
        {
          'Food Product':
            'All Food Products are valid, narrow down preferences',
        },
      ]);
    }
  };

  const handleReset = () => {
    setUserInput({allergies: [], diet: [], ingredients: [], foodItems: []});
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{mt: 4}}>
        <Grid container spacing={3}>
          {/* User Preferences Section (Left Side) */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                color={theme.palette.primary.main}
              >
                Select Your Preferences
              </Typography>
              <Box mb={3}>
                {/* Allergies Accordion */}
                <Accordion
                  expanded={expandedPanel === 'allergiesPanel'}
                  onChange={handleAccordionChange('allergiesPanel')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="allergiesPanel-content"
                    id="allergiesPanel-header"
                  >
                    <Typography>Allergies</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{maxHeight: '200px', overflowY: 'auto'}}
                  >
                    <AllergiesCheckBox
                      allergies={allInfo.allergies}
                      userInput={userInput}
                      setUserInput={setUserInput}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Diets Accordion */}
                <Accordion
                  expanded={expandedPanel === 'dietsPanel'}
                  onChange={handleAccordionChange('dietsPanel')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="dietsPanel-content"
                    id="dietsPanel-header"
                  >
                    <Typography>Diets</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{maxHeight: '200px', overflowY: 'auto'}}
                  >
                    <DietCheckBox
                      diets={allInfo.diets}
                      userInput={userInput}
                      setUserInput={setUserInput}
                    />
                  </AccordionDetails>
                </Accordion>

                {/* Ingredients Accordion */}
                <Accordion
                  expanded={expandedPanel === 'ingredientsPanel'}
                  onChange={handleAccordionChange('ingredientsPanel')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ingredientsPanel-content"
                    id="ingredientsPanel-header"
                  >
                    <Typography>Ingredients</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{maxHeight: '200px', overflowY: 'auto'}}
                  >
                    <IngredientsCheckBox
                      ingredients={allInfo.ingredients}
                      userInput={userInput}
                      setUserInput={setUserInput}
                    />
                  </AccordionDetails>
                </Accordion>
              </Box>

              <Box sx={{mt: 'auto'}}>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{mr: 1}}
                >
                  Submit Preferences
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  color="secondary"
                  size="large"
                >
                  Reset Preferences
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Recommendations Section (Right Side) */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                align="center"
                color={theme.palette.secondary.main}
              >
                Recommendations
              </Typography>
              <Output recommendations={recommendations} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Recommendations;
