import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from '../src/components/SignIn'; // Adjust the path based on your file structure
import * as FirebaseModule from '../src/components/Firebase'; // Adjust the path based on your file structure

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the Firebase module
jest.mock('../src/components/Firebase', () => ({
  signUpOrInWithPopupGoogle: jest.fn(),
}));

describe('SignIn Component', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    FirebaseModule.signUpOrInWithPopupGoogle.mockClear();
  });

  test('renders SignIn component', () => {
    render(<SignIn />);
    const signInButton = screen.getByText('Sign In with Google');
    expect(signInButton).toBeInTheDocument();
  });

  test('shows error message on sign in failure', async () => {
    const errorMessage = 'An error occurred';
    FirebaseModule.signUpOrInWithPopupGoogle.mockRejectedValue(
      new Error(errorMessage),
    );

    render(<SignIn />);
    const signInButton = screen.getByText('Sign In with Google');
    fireEvent.click(signInButton);

    // Wait for the promise to resolve and the component state to update
    const errorText = await screen.findByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });
});
