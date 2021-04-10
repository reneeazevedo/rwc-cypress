const faker = require('faker')

const el = require('./elements').ELEMENTS

import routes from '../../routes'

class Articles {

    acessarFomularioDeNovaPublicacao() {
        cy.get(el.linkNovaPublicacao).click()
    }


    // preecher o formulário do artigo
    preencherFomulario() {
        cy.get(el.inputTitle).type('1')
        cy.get(el.inputDescription).type('2')
        cy.get(el.textAreaContent).type(faker.lorem.paragraphs(5, '\n \r'))
        cy.get(el.inputTags).type('4')
    }

    // submeter o artigo
    submeterPublicacao() {


        cy.get(el.buttonSubmit).click()

    }

    verificarSePublicacaoFoiCriadaComSucesso() {

        cy.wait(`@${routes.as.postArticles}`).then((postArticlesResponse) => {
            expect(postArticlesResponse.status).to.eq(200)
        })
        cy.wait(`@${routes.as.getArticlesTitle}`).then((getArticlesTitleResponse) => {
            expect(getArticlesTitleResponse.status).to.eq(200)
        })
        cy.wait(`@${routes.as.getArticlesTitleComments}`).then((getArticlesTitleCommentsResponse) => {
            expect(getArticlesTitleCommentsResponse.status).to.eq(200)
        })

    }


}
export default new Articles();