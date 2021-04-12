const faker = require('faker')

const el = require('./elements').ELEMENTS

import routes from '../../routes'

let txtInputTitle
let txtInputDescription
let txtAreaContent
class Articles {

    acessarFomularioDeNovaPublicacao() {
        cy.get(el.linkNovaPublicacao).click()
    }


    // preecher o formulário do artigo
    preencherFomulario() {
        txtInputTitle = faker.lorem.word(10)
        txtInputDescription = faker.lorem.sentence(20)
        txtAreaContent = faker.lorem.paragraphs(1, '\n \r')

        cy.get(el.inputTitle).type(txtInputTitle)
        cy.get(el.inputDescription).type(txtInputDescription)
        cy.get(el.textAreaContent).type(txtAreaContent)
        cy.get(el.inputTags).type('4')
    }

    // submeter o artigo
    submeterPublicacao() {
        cy.get(el.buttonSubmit).click()
    }

    verificarSePublicacaoFoiCriadaComSucesso() {
        //Verificações reposta API
        cy.wait(`@${routes.as.postArticles}`).then((postArticlesResponse) => {

            expect(postArticlesResponse.status).to.eq(200)
            expect(postArticlesResponse.response.body.article.author.username).to.eq(Cypress.config().user.name)
            expect(postArticlesResponse.response.body.article.title).to.eq(txtInputTitle)
            expect(postArticlesResponse.response.body.article.description).to.eq(txtInputDescription)
            expect(postArticlesResponse.response.body.article.body).to.eq(txtAreaContent)
            expect(postArticlesResponse.response.body.article.author.username).to.eq(Cypress.config().user.name)
            expect(postArticlesResponse.response.body.article.createdAt).not.null

        })
        cy.wait(`@${routes.as.getArticlesTitle}`).then((getArticlesTitleResponse) => {
            expect(getArticlesTitleResponse.status).to.eq(200)
            expect(getArticlesTitleResponse.response.body.article.title).to.eq(txtInputTitle) 
        })
        cy.wait(`@${routes.as.getArticlesTitleComments}`).then((getArticlesTitleCommentsResponse) => {
            expect(getArticlesTitleCommentsResponse.status).to.eq(200)
        })

        cy.url().should('include', `http://demo.realworld.io/#/article/${txtInputTitle.replace(/ /g, "-").toLowerCase()}`)

        //Verificações GUI
        cy.get('[ng-bind*=title]').should('contain.text', txtInputTitle)
        cy.get('div[ng-bind-html*=body]').should('contain.text', txtAreaContent)
        cy.get('[ng-bind*=username]').first().should('contain.text', Cypress.config().user.name)

    }


}
export default new Articles();