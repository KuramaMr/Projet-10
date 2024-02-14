const login = require("../fixtures/login.json");

describe("Affichage des produits sur la page d'acceuil", () => {
    it('vérifiez le chargement de la page', () => {

        cy.visit('http://localhost:8080/');

        cy.wait(2000);
    });

    it('vérifiez l’affichage de tous les produits et leurs informations', () => {

        cy.visit('http://localhost:8080/');

        cy.get('[data-cy="product-home"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

        cy.get('[data-cy="product-home-img"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

        cy.get('[data-cy="product-home-name"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

        cy.get('[data-cy="product-home-ingredients"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

        cy.get('[data-cy="product-home-price"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

        cy.get('[data-cy="product-home-link"]').should('exist', 3).then(($element) => {
            if($element) {
                cy.log('Element is present')
            } else {
                cy.log('Element is not present')
            };
        });

    });
}); 


describe("vérifiez l’affichage de CHAQUE produit et leurs informations", () => {

    it('vérifiez l’affichage de chaque produit', () => {
        cy.visit('http://localhost:8080/');
        cy.get('[data-cy="product-home"]').should('exist', 3);
        cy.get('[data-cy="product-home-link"]').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="detail-product-description"]').should('exist');
        cy.get('[data-cy="detail-product-img"]').should('exist');
        cy.get('[data-cy="detail-product-price"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('exist');

        cy.visit('http://localhost:8080/');
        cy.get('[data-cy="product-home"]').should('exist', 3);
        cy.get('[data-cy="product-home-link"]').eq(1).click();
        cy.wait(2000);
        cy.get('[data-cy="detail-product-description"]').should('exist');
        cy.get('[data-cy="detail-product-img"]').should('exist');
        cy.get('[data-cy="detail-product-price"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('exist');

        cy.visit('http://localhost:8080/');
        cy.get('[data-cy="product-home"]').should('exist', 3);
        cy.get('[data-cy="product-home-link"]').eq(2).click();
        cy.wait(2000);
        cy.get('[data-cy="detail-product-description"]').should('exist');
        cy.get('[data-cy="detail-product-img"]').should('exist');
        cy.get('[data-cy="detail-product-price"]').should('exist');
        cy.get('[data-cy="detail-product-stock"]').should('exist');

        });
});

describe('Panier', () => {
    let Authentification;
    let orderLines;
    let stockCart;

    it('Login', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
                username: login.email,
                password: login.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            Authentification = response.body.token;
        });
    });

    it('On delete le panier', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${Authentification}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
            orderLines = response.body.orderLines;
            orderLines.forEach(line => {
                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:8081/orders/'+line.id+'/delete',
                    headers: {
                      Authorization: `Bearer ${Authentification}`
                    }
                });
            });
        });
    });
    
    it("Ajout d'un produit dans le panier", () => {
        cy.visit('http://localhost:8080');
            cy.get('[data-cy=nav-link-login]').click();
            cy.get('[data-cy=login-input-username]')
            .type(login.email)
            .should("have.value", login.email);
            cy.get('[data-cy=login-input-password]')
            .type(login.password)
            .should("have.value", login.password);
            cy.get('[data-cy=login-submit]').click();
            cy.wait(2000);

            // On navigue vers le produit
            cy.get ('[data-cy="nav-link-products"]').click();
            cy.get ('button').eq(1).should('contain', 'Consulter').click();
            cy.wait(2000);

            //Vérification du stock
            cy.get('[data-cy="detail-product-stock"]').contains('1 en stock');

            //Ajout au panier du produit
            cy.get('[data-cy="detail-product-add"]').click();

            //Vérifié que le produit est dans le panier
            cy.get ('[data-cy="nav-link-cart"]').click();
            cy.contains("Chuchotements d'été").should('exist');
            cy.get('[data-cy="cart-line-quantity"]').then(($element) => {
                expect($element).to.have.text('');
            });   

            // Doit avoir 0 en stock
            cy.get ('[data-cy="nav-link-products"]').click();
            cy.get ('button').eq(1).should('contain', 'Consulter').click();
            cy.wait(2000);
            cy.get('[data-cy="detail-product-stock"]').contains('0 en stock');
    });
});

describe('Panier', () => {
    let Authentification;
    let orderLines;
    let stockCart;

    it('Login', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
                username: login.email,
                password: login.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            Authentification = response.body.token;
        });
    });

    it('On delete le panier', () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${Authentification}`
          }
        }).then((response) => {
            expect(response.status).to.eq(200);
            orderLines = response.body.orderLines;
            orderLines.forEach(line => {
                cy.request({
                    method: 'DELETE',
                    url: 'http://localhost:8081/orders/'+line.id+'/delete',
                    headers: {
                      Authorization: `Bearer ${Authentification}`
                    }
                });
            });
        });
    });

    it('Entrer un chiffre négatif', () => {
        cy.visit('http://localhost:8080');
            cy.get('[data-cy=nav-link-login]').click();
            cy.get('[data-cy=login-input-username]')
            .type(login.email)
            .should("have.value", login.email);
            cy.get('[data-cy=login-input-password]')
            .type(login.password)
            .should("have.value", login.password);
            cy.get('[data-cy=login-submit]').click();
            cy.wait(2000);

            // On navigue vers le produit
            cy.get ('[data-cy="nav-link-products"]').click();
            cy.get ('button').eq(1).should('contain', 'Consulter').click();
            cy.wait(2000);

            cy.get ('[data-cy="detail-product-quantity"]').click();
            cy.get ('[data-cy="detail-product-quantity"]').clear();
            cy.get ('[data-cy="detail-product-quantity"]').type('-4');
            cy.get ('[data-cy="detail-product-add"]').click();
            cy.wait(2000);

            //Vérifié que le produit est dans le panier
            cy.get ('[data-cy="nav-link-cart"]').click();
            cy.contains("Chuchotements d'été").should('not.exist').then(($element) => {
                if($element) {
                    cy.log('Element is present')
                } else {
                    cy.log('Element is not present')
                };
            });    
    });

    it('Entrer un chiffre supérieur à 20', () => {
        cy.visit('http://localhost:8080');
            cy.get('[data-cy=nav-link-login]').click();
            cy.get('[data-cy=login-input-username]')
            .type(login.email)
            .should("have.value", login.email);
            cy.get('[data-cy=login-input-password]')
            .type(login.password)
            .should("have.value", login.password);
            cy.get('[data-cy=login-submit]').click();
            cy.wait(2000);

            // On navigue vers le produit
            cy.get ('[data-cy="nav-link-products"]').click();
            cy.get ('button').eq(1).should('contain', 'Consulter').click();
            cy.wait(2000);

            cy.get ('[data-cy="detail-product-quantity"]').click();
            cy.get ('[data-cy="detail-product-quantity"]').clear();
            cy.get ('[data-cy="detail-product-quantity"]').type('25');
            cy.get ('[data-cy="detail-product-add"]').click();
            cy.wait(2000);

            //Vérifié que le produit est dans le panier
            cy.get ('[data-cy="nav-link-cart"]').click();
            cy.contains("Chuchotements d'été").should('exist').then(($element) => {
                if($element) {
                    cy.log('Element is present')
                } else {
                    cy.log('Element is not present')
                };
            });    
    });

    it('Login', () => {
        cy.request ({
            method: 'POST',
            url:'http://localhost:8081/login',
            body: {
            username: login.email,
            password: login.password
            }
        }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');

        Authentification = response.body.token;
        });
    });

    it("Vérification du nombre dans le panier avec l'api", () => {
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
            headers: {
                Authorization: `Bearer ${Authentification}`
            },
            
        }).then((response) => {
            expect(response.status).to.eq(200);
            response.body.orderLines.forEach((orderLine) => {
                if(orderLine.product.id===4 ) {
                expect(orderLine.quantity).to.be.equal(25); 
                }
            });
        });
    });
});