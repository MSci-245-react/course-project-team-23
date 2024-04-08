describe('featureRequiredSignIn', () => {
  it('Test recommendations Links to SignIn Page if not signed in', () => {
    //cy.go('back');
    cy.visit('/');
    cy.contains('Get Started').click();
    cy.url().should('include', '/SignIn')
  });
  it('Test discoverAllRecipes Links to SignIn Page if not signed in', () => {
    cy.visit('/');
    cy.contains('Explore Recipes').click();
    cy.url().should('include', '/SignIn')
  });

  it('Test DailyPlanner Links to SignIn Page if not signed in', () => {
    cy.visit('/');
    cy.contains('Plan & Shop').click();
    cy.url().should('include', '/SignIn')
  });

  it('Test shareAndCollaborate Links to SignIn Page if not signed in', () => {
    cy.visit('/');
    cy.contains('Share Your Ideas').click();
    cy.url().should('include', '/SignIn')
  });
});
