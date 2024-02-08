const apiLogin = `${Cypress.env("apiUrl")}/login`;
const login = require("../fixtures/login.json");

context("Login, utilisateur connu ou inconnu", () => {
    
    let authentification;

    it('Connexion connu', () => {
        cy.request({
            method: 'POST',
            url: apiLogin,
            body: {
                username: login.email,
                password: login.password
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            authentification = response.body.token;
        });
    });
    
    it('Ajouter un avis', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8081/reviews',
            headers: {
                Authorization: `Bearer ${authentification}`,
            },
            body: {
                title:"Petit titre pour le commentaire",
                comment: "Le petit commentaire",
                rating: "5",
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });     
});