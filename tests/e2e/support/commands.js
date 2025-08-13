// realsoccer/tests/e2e/support/commands.js
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to log in a user via API
Cypress.Commands.add('loginApi', (email, password) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
    email,
    password,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('token');
    window.localStorage.setItem('userToken', response.body.token);
    window.localStorage.setItem('userData', JSON.stringify(response.body));
  });
});

// Custom command to register a user via API
Cypress.Commands.add('registerApi', (username, email, password, role = 'user') => {
  cy.request('POST', `${Cypress.env('apiUrl')}/auth/register`, {
    username,
    email,
    password,
    role,
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('token');
    window.localStorage.setItem('userToken', response.body.token);
    window.localStorage.setItem('userData', JSON.stringify(response.body));
  });
});

// Custom command to clear local storage and visit homepage
Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage();
  cy.visit('/');
});

// Example of a custom command for admin login (if needed for specific tests)
Cypress.Commands.add('loginAdminApi', (email, password) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
    email,
    password,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('token');
    expect(response.body.role).to.eq('admin');
    window.localStorage.setItem('userToken', response.body.token);
    window.localStorage.setItem('userData', JSON.stringify(response.body));
  });
});