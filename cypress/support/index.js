// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration

import routes from "./routes"

// ***********************************************************
Cypress.Commands.add('backgroundLogin', () => {
    // PROCESSO DE LOGIN EM BACKGROUND
    //1. realizar uma requisição do tipo POST com email e senha
    //2. capturar o token que é recebido da nossa requisição
    //3. usar o token recebido para salvar no localstorage
    cy.request({
        method: 'POST',
        url: `${Cypress.config().apiUrl}users/login`,
        body: {
            user: {
                email: "renee.mourasys@gmail.com",
                password: "101827Rm@"
            }

        }

    }).then((loginReponse) => {
        console.log(loginReponse.body)
        cy.log(loginReponse.body.user.token)

        cy.visit('editor/', {
            onBeforeLoad: (win) => {
                win.localStorage.setItem('jwtToken', loginReponse.body.user.token)
            }

        })



    })
})

before(()=>{
  routes.init()  
})
