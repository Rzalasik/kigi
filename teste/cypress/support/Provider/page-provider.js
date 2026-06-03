import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Provider {
  nameRandom = faker.company.name();
  MakeRegisterProvider(cpf) {
    this.nameRandom = faker.company.name();
    cy.get(el.tabProvider).click()
    cy.get(el.btnRegister).click()
    if (cpf != undefined) {
      cy.get(el.inputCpf).type(cpf)
    }
    cy.get(el.inputName).type(this.nameRandom)
    cy.get(el.inputCep).type('87200234')
    cy.get(el.inputNumberaddress).type(faker.number.int())
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/individual`).as('provider')
    cy.get(el.btnSaveRegister).click()
    cy.wait('@provider', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  EditProvider(search = Cypress.env('providerDocument'),name = faker.person.fullName(),document ){
    cy.get(el.tabProvider).click()
    cy.get(el.inputSearchProvider).type(search,{delay:800})
    cy.get('body').then($body=>{
      
      if($body.find(el.btnEditProvider).length > 0){
        cy.get(el.btnEditProvider).first().click()
        cy.get(el.inputCpf).clear()
        if(document != undefined){
          cy.get(el.inputCpf).type(document)
        }
        cy.get(el.inputEditName).clear().type(name)
        cy.get(el.btnSaveRegister).click() 
      }
    })
    
  }
}

export default new Provider()
