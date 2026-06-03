import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'
import {getLastSegment} from '../Utils/utils'

class Client {
  MakeRegisterClient(cpf) {
    cy.get(el.tabClient).click()
    cy.get(el.btnRegister).click()
    if (cpf != undefined) {
      cy.get(el.inputCpf).type(cpf)
    }
    cy.get(el.inputName).type(faker.person.fullName())
    cy.get(el.inputCep).first().type('87200234')
    cy.get(el.inputNumberaddress).first().type(faker.number.int())
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/individual`).as('client')
    cy.get(el.btnSaveRegister).click()
    cy.wait('@client', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  GetCoupons(){
    cy.get(el.tabClient).click()
    cy.get(el.inputSearchClient).type(Cypress.env('clientNameComplete'),{delay:500})
    cy.wait(3000)
    cy.get('.table > tbody > tr.ng-scope > :nth-child(1)').invoke('text').then((value)=>{
      const idClient = justNumbers(value)
      const token = localStorage.getItem('token')
      cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/${idClient}?recipientType=CLIENT`,
        headers: {
            Gumgatoken: token
        }
      }).then((resp) => {
          Cypress.env('valueCoupon', resp.body)
          cy.log(Cypress.env('valueCoupon'))
      });
    })
  }
  
}

export default new Client()
