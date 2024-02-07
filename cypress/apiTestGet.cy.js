const login = require("../fixtures/login.json");
const apiOrders = `${Cypress.env("apiUrl")}/orders`;
const apiProducts = `${Cypress.env("apiUrl")}/products`;

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
            cy.get('[data-cy="nav-link-logout"]').should('exist')
            cy.request("Get", apiOrders).then((response) => {
                expect(response.status).to.eq(200)
            });
        });
    });
});

context("Visite du site sans être connecté", () => {  
    
    it("Visite le site sans être connecté & récupération du panier", () => {
        cy.visit('http://localhost:8080');
        cy.request("Get", apiOrders).then((response) => {
            expect(response.status).to.eq(403)
        });
    });
});

context("Requête d'une fiche produit spécifique", () => {

    let productsId;

    it("Récupérer toutes les catégories et extraire un ID", () => {
        cy.request("Get", apiProducts).then((response) => {
            productsId = response.body[Math.floor(Math.random() * response.body.length)].id;
        });
    });

    it("Récupérer les détails d'une catégorie par ID", () => {
        expect(productsId).to.be.a("number");

        cy.request(apiProducts + `/${productsId}`)
        .its("status")
        .should("eq", 200);
    });
});