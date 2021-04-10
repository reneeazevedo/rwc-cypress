/// <reference types="Cypress" />
import articles from '../support/pages/articles'
import routes from '../support/routes'
context('Publicação', () => {

    beforeEach(() => {

        cy.backgroundLogin()
        articles.acessarFomularioDeNovaPublicacao()
    })

    it('Caria uma nova publicação', () => {
        articles.preencherFomulario()
        articles.submeterPublicacao()
        articles.verificarSePublicacaoFoiCriadaComSucesso()
    });
});