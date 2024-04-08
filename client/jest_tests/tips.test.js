import React from 'react';
import { render } from '@testing-library/react';
import Tips from '../src/components/Tips/index.js';
import '@testing-library/jest-dom/extend-expect'; 

jest.mock('../src/components/Navigation/NavBar', () => {
  return () => <div>Mocked NavBar</div>;
});

describe('Tips component', () => {
  test('renders cooking tips', () => {
    const { getByText } = render(<Tips />);
    
    expect(getByText('Cooking Tips')).toBeInTheDocument();
    expect(getByText('Use fresh herbs to enhance the flavor of your dishes.')).toBeInTheDocument();
    expect(getByText('Invest in good quality knives for easier and safer food preparation.')).toBeInTheDocument();
    expect(getByText('Experiment with different cooking techniques like grilling, roasting, and sautéing.')).toBeInTheDocument();
  });

  test('renders health tips', () => {
    const { getByText } = render(<Tips />);
    
    expect(getByText('Health Tips')).toBeInTheDocument();
    expect(getByText('Stay hydrated by drinking plenty of water throughout the day.')).toBeInTheDocument();
    expect(getByText('Incorporate more fruits and vegetables into your diet for added nutrients.')).toBeInTheDocument();
    expect(getByText('Prioritize regular exercise to maintain a healthy lifestyle.')).toBeInTheDocument();
  });
});
