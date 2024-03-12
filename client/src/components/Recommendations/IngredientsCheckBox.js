import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';

const IngredientsCheckBox = ({ingredients, userInput, setUserInput}) => {
  const handleToggle = value => {
    const currentIndex = userInput.ingredients.indexOf(value);
    const newChecked = [...userInput.ingredients];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserInput({...userInput, ingredients: newChecked});
  };

  return (
    <FormGroup>
      {ingredients.map(ingredient => (
        <FormControlLabel
          key={ingredient}
          control={
            <Checkbox
              checked={userInput.ingredients.includes(ingredient)}
              onChange={() => handleToggle(ingredient)}
            />
          }
          label={ingredient}
        />
      ))}
    </FormGroup>
  );
};

export default IngredientsCheckBox;
