describe('empty spec', () => {
  it('can view the home page', () => {
    cy.visit('/');
    cy.contains('Welcome to Meal Planner');
    cy.contains('Plan Your Meals');
  });

  // it('Test signIn Links to google signIn Page', () => {
  //   cy.contains('Sign In').click();
  //   cy.url().should('include', '/SignIn')
  // });

  // it('Test signUp Links to discover Page', () => {
  //   cy.contains('Sign Up').click();
  //   cy.url().should('include', '/SignUp')
  // });

  it('Test planYourMeals Links to discover Page', () => {
    //cy.go('back');
    //cy.go('back');
    cy.contains('Get Started').click();
    cy.url().should('include', '/Plan')
  });

  it('Test discoverAllRecipes Links to recipes Page', () => {
    cy.go('back');
    cy.contains('Explore Recipes').click();
    cy.url().should('include', '/Discover')
  });

  it('Test CreateAShoppingList Links to discover Page', () => {
    cy.go('back');
    cy.contains('View Shopping List').click();
    cy.url().should('include', '/ShoppingList')
  });

  it('Test shareAndCollaborate Links to discover Page', () => {
    cy.go('back');
    cy.contains('Share Your Plans').click();
    cy.url().should('include', '/Share')
  });
});



// describe('shows ingredients from the server', () => {
//   it('shows recipes from the server', () => {
//   const mushroomRisotto = 'Mushroom Risotto';
//   const mushroomSoup = 'Mushroom Soup';
//   cy.intercept('GET', '/api/foodIngredients', [
//   {id: 1, name: mushroomRisotto},
//   {id: 2, name: mushroomSoup},
//   ]);
//   cy.visit('/');
//   cy.contains(mushroomRisotto);
//   cy.contains(mushroomSoup);
//   });
//   });