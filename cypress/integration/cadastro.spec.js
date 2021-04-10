/// <reference types="Cypress" />
const faker = require('faker')

context('Cadastro', () => {
    it('Cadastrar um novo usuário', () => {
        cy.visit('register')

        //Campo Username  input[placeholder=Username]
        cy.get('input[ng-model*=username]').type(faker.name.firstName() + faker.name.lastName())
        //Campo Email input[placeholder=Email]
        cy.get('input[ng-model*=email]').type(faker.internet.email())
        //Campos Password input[placeholder=Password]
        cy.get('input[ng-model*=password]').type("101827Rm@")
        //Botão Sign up
        cy.get('.btn[type=submit]').click()


    });
});