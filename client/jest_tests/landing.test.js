import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import Landing from '../src/components/Landing'; // Adjust the path based on your file structure

describe('Landing Page Tests', () => {
  const setup = () =>
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>,
    );

  test('renders Welcome to Meal Planner message', () => {
    setup();
    const welcomeMessage = screen.getByText('Welcome to Meal Planner');
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders Plan, Cook, and Enjoy Delicious Meals subtitle', () => {
    setup();
    const subtitle = screen.getByText('Plan, Cook, and Enjoy Delicious Meals');
    expect(subtitle).toBeInTheDocument();
  });
});
