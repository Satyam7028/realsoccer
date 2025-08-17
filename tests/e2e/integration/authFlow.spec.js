// tests/e2e/integration/authFlow.spec.js

describe('Authentication Flow', () => {
  const user = {
    username: `testuser${Date.now()}`, // Use a unique username for each test run
    email: `testuser${Date.now()}@example.com`,
    password: 'password123',
  };

  beforeEach(() => {
    // Navigate to the base URL before each test
    cy.visit('/');
  });

  it('allows a new user to register and then log in', () => {
    // 1. Navigate to the registration page
    cy.get('a[href="/register"]').click();
    cy.url().should('include', '/register');

    // 2. Fill out the registration form
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // 3. Verify successful registration and redirection to login/profile page
    // The exact URL or element depends on your implementation, here we check for profile.
    cy.url().should('include', '/profile'); 
    cy.get('div').contains('Profile Page'); // Example assertion

    // 4. Log out to prepare for login
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');

    // 5. Fill out the login form
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    // 6. Verify successful login and redirection
    cy.url().should('include', '/profile');
    cy.get('div').contains('Profile Page');
  });

  // You can add more tests here, for example, to test invalid login attempts
});