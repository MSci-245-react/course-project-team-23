import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AllergiesCheckBox from '../src/components/Recommendations/AllergiesCheckBox';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom library
const allergies = ['Peanuts', 'Shellfish', 'Dairy'];
const setUserInputMock = jest.fn();
describe('AllergiesCheckBox Component', () => {
  test('renders checkboxes for allergies', () => {
    render(
      <AllergiesCheckBox
        allergies={allergies}
        userInput={{ allergies: [] }}
        setUserInput={setUserInputMock}
      />
    );

    allergies.forEach((allergy) => {
      const checkboxLabel = screen.getByText(allergy);
      expect(checkboxLabel).toBeInTheDocument();
    });
  });

  test('updates userInput on checkbox change', () => {
    render(
      <AllergiesCheckBox
        allergies={allergies}
        userInput={{ allergies: [] }}
        setUserInput={setUserInputMock}
      />
    );

    const allergyToCheck = allergies[0];
    const checkboxLabel = screen.getByText(allergyToCheck);
    fireEvent.click(checkboxLabel);

    expect(setUserInputMock).toHaveBeenCalledWith({
      allergies: [allergyToCheck],
    });
  });
});