describe('recommendations', () => {
    it('can view the home page', () => {
      cy.visit('/');
      cy.contains('Welcome to Meal Planner');
      cy.contains('Plan Your Meals');
    });
  
    it('Test get started Links to SignIn Page', () => {
        cy.visit('/');
        cy.contains('Plan Your Meals');
        cy.contains('Get Started').click();
        cy.url().should('include', '/SignIn');

    });
    it('Test discoverAllRecipes Links to SignIn Page', () => {
        cy.visit('/');

        cy.contains('Plan Your Meals');
        cy.contains('Explore Recipes').click();
        cy.url().should('include', '/SignIn');
        cy.contains('Sign In with Google');

    });
  });
  
  
  
