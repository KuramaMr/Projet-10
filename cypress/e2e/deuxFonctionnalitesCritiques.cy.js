describe("Affichage des produits sur la page d'acceuil", () => {
    it('vérifiez le chargement de la page', () => {
        cy.visit('http://localhost:8080/');
        cy.wait(2000);
    });
}); 