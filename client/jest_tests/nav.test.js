import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../src/components/Navigation/NavBar';
import '@testing-library/jest-dom/extend-expect'; 


describe('NavBar', () => {
  test('renders navigation buttons', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const landingButton = screen.getByRole('link', { name: /landing/i });
    const discoverRecipesButton = screen.getByRole('link', { name: /discover recipes/i });
    const communityForumButton = screen.getByRole('link', { name: /communityforum/i });
    const tipsButton = screen.getByRole('link', { name: /tips/i });
    const yourInfoButton = screen.getByRole('link', { name: /your info/i });
    const recommendationsButton = screen.getByRole('link', { name: /recommendations/i });

    expect(landingButton).toBeInTheDocument();
    expect(discoverRecipesButton).toBeInTheDocument();
    expect(communityForumButton).toBeInTheDocument();
    expect(tipsButton).toBeInTheDocument();
    expect(yourInfoButton).toBeInTheDocument();
    expect(recommendationsButton).toBeInTheDocument();
  });

  // You can write more tests for specific functionalities if needed
});
