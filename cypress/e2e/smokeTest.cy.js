
const login = require("../fixtures/login.json");

context("Vérification des champs de connexion et du bouton", () => {

    before(() => {
        cy.visit('http://localhost:8080/#/login')
    });

        describe("Verification des champs de connexion et du bouton", () => {

            it("Verification des champs de connexion", () => {

            cy.get('[data-cy="login-input-username"]').should('exist');
            cy.get('[data-cy="login-input-password"]').should('exist');
            cy.get('[data-cy="login-submit"]').should('exist');
            });
        });
});

context("Vérification boutons ajout au panier", () => {

    describe("Conexion au site", () => {

        it('Connexion du client', () => {

            cy.visit('http://localhost:8080');
            cy.get('[data-cy=nav-link-login]').click();
            cy.get('[data-cy=login-input-username]')
            .type(login.email)
            .should("have.value", login.email);
            cy.get('[data-cy=login-input-password]')
            .type(login.password)
            .should("have.value", login.password);
            cy.get('[data-cy=login-submit]').click();
            cy.get('[data-cy=nav-link-logout]').should('exist');
            cy.visit('http://localhost:8080/#/products');
            cy.get('[data-cy=product-link]').first().click();
            cy.get('[data-cy=detail-product-add]').should('exist');
        });
    });
});

context("Vérification de la présence du champ de disponibilité du produit", () => {

    describe("Vérification du champs", () => {

        it('Vers les produits', () => {

            cy.visit('http://localhost:8080/#/products');
            cy.get('[data-cy="product-link"]').first().click();
            cy.get('[data-cy="detail-product-stock"]').should('exist');  
        });
        
    });
});

