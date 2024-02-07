const apiLogin = `${Cypress.env("apiUrl")}/login`;
const login = require("../fixtures/login.json");
const fauxLogin = require("../fixtures/loginFaux.json");

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

        it('Connexion inconnu', () => {
            cy.request({
                method: 'POST',
                url: apiLogin,
                body: {
                    username: fauxLogin.email,
                    password: fauxLogin.password,
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });
});
