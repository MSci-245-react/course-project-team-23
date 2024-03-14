import React from 'react';
import {Checkbox, FormControlLabel, FormGroup} from '@mui/material';

const LevelCheckBox = ({levels, userInput, setUserInput}) => {
  const handleToggle = value => {
    const currentIndex = userInput.level.indexOf(value);
    const newChecked = [...userInput.level];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setUserInput({...userInput, level: newChecked});
  };

  return (
    <FormGroup>
      {levels.map(level => (
        <FormControlLabel
          key={level}
          control={
            <Checkbox
              checked={userInput.level.includes(level)}
              onChange={() => handleToggle(level)}
            />
          }
          label={level}
        />
      ))}
    </FormGroup>
  );
};

export default LevelCheckBox;
