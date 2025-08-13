// realsoccer/tests/e2e/integration/smoke.spec.js
// <reference types="cypress" />

describe('Real Soccer Application Smoke Test', () => {
  beforeEach(() => {
    // Visit the base URL of the client application
    // This URL should be configured in cypress.json or cypress.config.js
    cy.visit('/');
  });

  it('should load the homepage and display key elements', () => {
    // Check if the main application container is visible
    cy.get('#root').should('be.visible');

    // Check for the presence of the main navigation bar (e.g., Header component)
    cy.get('header').should('be.visible');
    cy.contains('Real Soccer').should('be.visible'); // Assuming your logo/title contains "Real Soccer"

    // Check for common navigation links or elements
    cy.contains('Home').should('be.visible');
    cy.contains('Players').should('be.visible');
    cy.contains('Leagues').should('be.visible');
    cy.contains('Shop').should('be.visible');

    // Check for a login/register link or button
    cy.contains(/Login|Register|Sign In|Sign Up/i).should('be.visible');

    // Check for featured content sections on the homepage (adjust selectors as per your UI)
    cy.contains('Featured News').should('be.visible');
    cy.contains('Upcoming Fixtures').should('be.visible');
    cy.contains('Featured Products').should('be.visible');
  });

  it('should navigate to the Players page', () => {
    cy.contains('Players').click();
    cy.url().should('include', '/players'); // Assuming /players is the route
    cy.contains('Player Listing').should('be.visible'); // Assuming a title on the players page
  });

  it('should navigate to the Shop page', () => {
    cy.contains('Shop').click();
    cy.url().should('include', '/shop'); // Assuming /shop is the route
    cy.contains('Products').should('be.visible'); // Assuming a title on the shop page
  });

  // You can add more smoke tests here, e.g., checking for footer, basic responsiveness
});