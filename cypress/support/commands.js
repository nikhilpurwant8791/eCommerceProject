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

Cypress.Commands.add('login', (username , password) => {
    cy.intercept('/check').as('loginCheck');
    cy.visit('/');
    cy.get('#login2').should('have.text', 'Log in').click();
    cy.wait(700);
    cy.get('#loginusername').type(username);
    cy.get('#loginpassword').type(password);
    cy.get('[onclick="logIn()"]').should('have.text', 'Log in').click();
    cy.wait('@loginCheck');
    cy.wait(500);
    cy.get('#nameofuser').then((user) => {
        const user_name = user.text().split(' ').pop();
        expect(user_name).to.be.equal(username);
    })
})

Cypress.Commands.add('logout', ()=>{
    cy.wait(1000);
    cy.get('#logout2').click();
    cy.get('#login2').should('have.text', 'Log in');
})