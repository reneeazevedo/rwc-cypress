/// <reference types="Cypress" />

import login from '../support/pages/login'
context('Login', { browser: '!firefox' }, () => {
    it('Realizar login com sucesso', () => {
        login.acessarLogin()
        login.preencherFormulario()
        login.submeterFomulario()
        login.verificarSeLoginComSucesso()
    })
});