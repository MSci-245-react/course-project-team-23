import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DietCheckBox from '../src/components/Recommendations/DietCheckBox';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom library

const diets = ['Vegetarian', 'Non-Vegetarian'];
const setUserInputMock = jest.fn();
describe('DietCheckBox Component', () => {
    test('renders checkboxes for diets', () => {
      render(
        <DietCheckBox
          diets={diets}
          userInput={{ diet: [] }}
          setUserInput={setUserInputMock}
        />
      );
  
      diets.forEach((diet) => {
        const checkboxLabel = screen.getByText(diet);
        expect(checkboxLabel).toBeInTheDocument();
      });
    });
  
    test('updates userInput on checkbox change', () => {
      render(
        <DietCheckBox
          diets={diets}
          userInput={{ diet: [] }}
          setUserInput={setUserInputMock}
        />
      );
  
      const dietToCheck = diets[0];
      const checkboxLabel = screen.getByText(dietToCheck);
      fireEvent.click(checkboxLabel);
  
      expect(setUserInputMock).toHaveBeenCalledWith({
        diet: [dietToCheck],
      });
    });
  });