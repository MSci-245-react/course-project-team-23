import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';

const DietCheckBox = ({diets, userInput, setUserInput}) => {
  const handleToggle = value => {
    const currentIndex = userInput.diet.indexOf(value);
    const newChecked = [...userInput.diet];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserInput({...userInput, diet: newChecked});
  };

  return (
    <FormGroup>
      {diets.map(diet => (
        <FormControlLabel
          key={diet}
          control={
            <Checkbox
              checked={userInput.diet.includes(diet)}
              onChange={() => handleToggle(diet)}
            />
          }
          label={diet}
        />
      ))}
    </FormGroup>
  );
};

export default DietCheckBox;
