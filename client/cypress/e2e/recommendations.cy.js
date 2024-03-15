describe('recommendations', () => {
    it('can view the home page', () => {
      cy.visit('/');
      cy.contains('Welcome to Meal Planner');
      cy.contains('Plan Your Meals');
    });
  
    it('Test discoverAllRecipes Links to recipes Page', () => {
      cy.contains('Get Started').click();

      cy.url().should('include', '/recommendations')
    });

  });
  
  
  
