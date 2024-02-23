
const apiOrders = `${Cypress.env("apiUrl")}/orders`;
const apiProducts = `${Cypress.env("apiUrl")}/products`;

context("Vérification du panier en étant connecté", () => {

    let Autorisation;

    it('login test true', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
                username: 'test2@test.fr',
                password: 'testtest'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            Autorisation = response.body.token;
        })
    });

    it('Autorisation', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${Autorisation}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
    
});

context("Vérification si on reçoit 403 sans être connecté au panier", () => {  
    
    it("Visite le site sans être connecté & récupération du panier", () => {
        cy.visit('http://localhost:8080');
        cy.request("Get", apiOrders,)
        .then((response) => {   
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