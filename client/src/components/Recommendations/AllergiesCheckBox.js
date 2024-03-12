import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';

const AllergiesCheckBox = ({allergies, userInput, setUserInput}) => {
  const handleToggle = value => {
    const currentIndex = userInput.allergies.indexOf(value);
    const newChecked = [...userInput.allergies];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserInput({...userInput, allergies: newChecked});
  };

  return (
    <FormGroup>
      {allergies.map(allergy => (
        <FormControlLabel
          key={allergy}
          control={
            <Checkbox
              checked={userInput.allergies.includes(allergy)}
              onChange={() => handleToggle(allergy)}
            />
          }
          label={allergy}
        />
      ))}
    </FormGroup>
  );
};

export default AllergiesCheckBox;
