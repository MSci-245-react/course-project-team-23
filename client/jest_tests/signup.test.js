// SignUp.test.js
import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '../src/components/SignUp'; // Adjust the import path according to your project structure
import * as Firebase from '../src/components/Firebase'; // Adjust the import path according to your project structure
import {MemoryRouter} from 'react-router-dom'; // For handling <Link> outside of a router

// Mock Firebase and useNavigate
jest.mock('../src/components/Firebase', () => ({
  signUpOrInWithPopupGoogle: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useNavigate: () => jest.fn(),
}));

describe('SignUp Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    Firebase.signUpOrInWithPopupGoogle.mockClear();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Meal Stream/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up with Google/i)).toBeInTheDocument();
    expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
  });

  // Add more tests as needed to check for specific elements, interactions, or conditions
});
