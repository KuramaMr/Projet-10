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