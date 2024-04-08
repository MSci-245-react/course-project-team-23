describe('homepage', () => {
  it('home page title and button test', () => {
    cy.visit('/');
    cy.contains('Welcome to Meal Planner');
    cy.contains('Recommendations');
    cy.contains('Explore Recipes');
    cy.contains('Plan & Shop');
    cy.contains('Share Your Ideas');
    cy.contains('Get Started').click();
    cy.visit('/');
    cy.contains('Explore Recipes').click();
    cy.visit('/');
    cy.contains('Plan & Shop').click();
    cy.visit('/');
    cy.contains('Share Your Ideas').click();
    cy.visit('/');
  });
});

  // it('Test signIn Links to google signIn Page', () => {
  //   cy.contains('Sign In').click();
  //   cy.url().should('include', '/SignIn')
  // });

  // it('Test signUp Links to discover Page', () => {
  //   cy.contains('Sign Up').click();
  //   cy.url().should('include', '/SignUp')
  // });

//   it('Test recommendations Links to recommendation Page', () => {
//     //cy.go('back');
//     //cy.go('back');
//     cy.contains('Get Started').click();
//     cy.url().should('include', '/Recommendations')
//   });

//   it('Test discoverAllRecipes Links to recipes Page', () => {
//     cy.go('back');
//     cy.contains('Explore Recipes').click();
//     cy.url().should('include', '/Discover')
//   });

//   it('Test DailyPlanner Links to daily planner Page', () => {
//     cy.go('back');
//     cy.contains('Plan & Shop').click();
//     cy.url().should('include', '/DailyPlanner')
//   });

//   it('Test shareAndCollaborate Links to CommunityForum Page', () => {
//     cy.go('back');
//     cy.contains('Share Your Ideas').click();
//     cy.url().should('include', '/CommunityForum')
//   });
// });



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