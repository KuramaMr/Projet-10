const login = require("../fixtures/login.json");

context("Login", () => {

    describe("Attempt to sign in", () => {
        it('should have link to sign in', () => {
            cy.visit('http://localhost:8080');
            cy.get('[data-cy=nav-link-login]').click();
            cy.get('[data-cy=login-input-username]')
            .type(login.email)
            .should("have.value", login.email);
            cy.get('[data-cy=login-input-password]')
            .type(login.password)
            .should("have.value", login.password);
            cy.get('[data-cy=login-submit]').click();
        });
      });
});