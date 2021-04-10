const el = require('./elements').ELEMENTS

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


}

export default new Login();