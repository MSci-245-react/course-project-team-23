import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';

const FoodCheckBox = ({foodItems, userInput, setUserInput}) => {
  const handleToggle = value => {
    const currentIndex = userInput.foodItems.indexOf(value);
    const newChecked = [...userInput.foodItems];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserInput({...userInput, foodItems: newChecked});
  };

  return (
    <FormGroup>
      {foodItems.map(foodItem => (
        <FormControlLabel
          key={foodItem}
          control={
            <Checkbox
              checked={userInput.foodItems.includes(foodItem)}
              onChange={() => handleToggle(foodItem)}
            />
          }
          label={foodItem}
        />
      ))}
    </FormGroup>
  );
};

export default FoodCheckBox;
