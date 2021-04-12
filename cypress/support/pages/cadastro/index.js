const el = require('./elements').ELEMENTS
import routes from '../../routes'
const faker = require('faker')
let fullName
class Cadastro {
    
    acessarFormularioRegister() {
        cy.visit('register')
    }

    preencherFormulario() {
        fullName = faker.name.firstName() + faker.name.lastName()
        cy.get(el.inputUsername).type(fullName)
        cy.get(el.inputEmail).type(faker.internet.email())
        cy.get(el.inputPassword).type("101827Rm@")
    }

    submeterFormulario() {
        cy.get(el.buttonSubmit).click()
    }

    verificarSeUsuarioCadastradoComSucesso() {

        cy.wait(`@${routes.as.postUsers}`).then((postUsersResponse) => {
            expect(postUsersResponse.status).to.eq(200)
        })
        cy.wait(`@${routes.as.getTags}`).then((getTagsResponse) => {
            expect(getTagsResponse.status).to.eq(200)
        })
        cy.wait(`@${routes.as.getArticlesFeed}`).then((gettArticlesFeedResponse) => {
            expect(gettArticlesFeedResponse.status).to.eq(200)
        })

        cy.url().should('eq','http://demo.realworld.io/#/')

        cy.get(el.validateCurrentUser).should('contain.text',fullName)
        cy.get(el.validateMsgArticlePreview).should('contain.text','No articles are here... yet.')


    }


}

export default new Cadastro();






