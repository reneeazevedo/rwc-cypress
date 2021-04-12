const el = require('./elements').ELEMENTS
import routes from '../../routes'
class Login {
    acessarLogin() {
        //acesssar a pagina de login
        cy.visit('login')
    }

    preencherFormulario() {
        //preencher formulário
        cy.get(el.inputEmail).type(Cypress.config().user.email)
        cy.get(el.inputPassword).type(Cypress.config().user.password)
    }

    submeterFomulario() {
        cy.get(el.buttonSubmit).click()
    }

    validarLoginComSucesso() {
        //validações reposta API
        cy.wait(`@${routes.as.postUsersLogin}`).then((postUsersLoginResponse) => {
            expect(postUsersLoginResponse.status).to.eq(200)
            expect(postUsersLoginResponse.response.body.user.id).not.null
            expect(postUsersLoginResponse.response.body.user.username).to.eq(Cypress.config().user.name)
            expect(postUsersLoginResponse.response.body.user.email).to.eq(Cypress.config().user.email)
            expect(postUsersLoginResponse.response.body.user.createdAt).not.null
            expect(postUsersLoginResponse.response.body.user.updatedAt).not.null
        })
        cy.wait(`@${routes.as.getTags}`).then((getTagsResponse) => {
            expect(getTagsResponse.status).to.eq(200)
        })
        cy.wait(`@${routes.as.getArticlesFeed}`).then((gettArticlesFeedResponse) => {
            expect(gettArticlesFeedResponse.status).to.eq(200)
        })

        //Validação url
        cy.url().should('eq', 'http://demo.realworld.io/#/')

        //Validações de GUI
        cy.get(el.validateCurrentUser).should('contain.text', Cypress.config().user.name)

    }


}

export default new Login();