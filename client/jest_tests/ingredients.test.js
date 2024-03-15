import React from 'react';
import { render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import IngredientsCheckBox from '../src/components/Recommendations/IngredientsCheckBox';
import '@testing-library/jest-dom/extend-expect'; // Import jest-dom library

const ingredients = ['Chicken', 'Broccoli', 'Tomato'];
const setUserInputMock = jest.fn();

describe('IngredientsCheckBox Component', () => {
    test('renders checkboxes for ingredients', () => {
      render(
        <IngredientsCheckBox
          ingredients={ingredients}
          userInput={{ ingredients: [] }}
          setUserInput={setUserInputMock}
        />
      );
  
      ingredients.forEach((ingredient) => {
        const checkboxLabel = screen.getByText(ingredient);
        expect(checkboxLabel).toBeInTheDocument();
      });
    });
  
    test('updates userInput on checkbox change', () => {
      render(
        <IngredientsCheckBox
          ingredients={ingredients}
          userInput={{ ingredients: [] }}
          setUserInput={setUserInputMock}
        />
      );
  
      const ingredientToCheck = ingredients[0];
      const checkboxLabel = screen.getByText(ingredientToCheck);
      fireEvent.click(checkboxLabel);
  
      expect(setUserInputMock).toHaveBeenCalledWith({
        ingredients: [ingredientToCheck],
      });
    });
  });