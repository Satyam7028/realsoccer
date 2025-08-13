// realsoccer/tests/e2e/support/index.js
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Add any global setup or teardown here
beforeEach(() => {
  // Example: Clear local storage before each test to ensure a clean state
  cy.clearLocalStorage();
});

// Example: Handle uncaught exceptions from the application
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // This can be useful for third-party scripts that might throw errors
  // but are not critical to your application's functionality.
  return false;
});

// You might also want to set up global environment variables for Cypress
// This can be done in cypress.json or cypress.config.js
// For example:
// {
//   "baseUrl": "http://localhost:3000",
//   "env": {
//     "apiUrl": "http://localhost:5000/api"
//   }
// }