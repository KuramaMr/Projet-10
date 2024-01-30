const apiOrders = `${Cypress.env("apiUrl")}/orders`;

context("Visite du site sans être connecté", () => {  
    
    it("Visite le site sans être connecté", () => {
        cy.visit('http://localhost:8080')
    });
})

context("GET /orders", () => {
    it("Récupération du panier", () => {
        cy.request("Get", apiOrders).then((response) => {
            expect(response.status).to.eq(403)
        });
    });
})
