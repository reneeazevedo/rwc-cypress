/// <reference types="Cypress" />
import articles from '../support/pages/articles'

context('Publicação', () => {

    beforeEach(() => {

        cy.backgroundLogin()
        articles.acessarFomularioDeNovaPublicacao()
    })

    it('Criar uma nova publicação', () => {
        articles.preencherFomulario()
        articles.submeterPublicacao()
        articles.verificarSePublicacaoFoiCriadaComSucesso()
    });
});