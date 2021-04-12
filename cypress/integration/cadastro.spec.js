/// <reference types="Cypress" />
const faker = require('faker')
import cadastro from '../support/pages/cadastro'
context('Cadastro', () => {
    
    it('Cadastrar um novo usuário', () => {
        
        cadastro.acessarFormularioRegister()
        cadastro.preencherFormulario() 
        cadastro.submeterFormulario()
        cadastro.verificarSeUsuarioCadastradoComSucesso()

    });
});