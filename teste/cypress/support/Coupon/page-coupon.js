import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Coupon {
  RegisterCoupon(
    codCoupon = faker.music.songName(),
    valueCoupon = 1000,
    haveLimit = false,
    valueLimite,
  ) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabCoupon).click()
    cy.get(el.btnRegister).click()
    cy.wait(4000)
    cy.get(el.inputCodCoupon).type(codCoupon)
    cy.get(el.inputValue).type(valueCoupon)
    if (haveLimit) {
      cy.get(el.btnLimiteQtd).click()
      cy.get(el.inputLimiteQtd).type(valueLimite)
    }
    cy.get(el.btnSaveRegister).click()
    cy.wait(4000)
  }
  DeleteCoupon() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabCoupon).click()
    cy.get(el.btnDelete).click()
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/coupon/*`).as('coupon')
    cy.contains('button', ' Sim ').click()
    cy.wait('@coupon').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  UseCouponSale(codCoupon) {
    cy.get(el.inputCouponSale).type(codCoupon + '{enter}')
    cy.wait(2000)
  }
  EditCoupon(value, uncheckLimit = false) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabCoupon).click()
    cy.get(el.btnEdit).click()
    if (value != undefined) {
      cy.get(el.inputValue).clear().type(value)
    }
    if (uncheckLimit) {
      cy.wait(3000)
      cy.get('body').then(($body) => {
        cy.log(
          $body.find(':nth-child(1) > .ng-isolate-scope > .mbg-input-number-wrapper > .ng-pristine')
            .length,
        )
        if (
          $body.find(':nth-child(1) > .ng-isolate-scope > .mbg-input-number-wrapper > .ng-pristine')
            .length > 0
        ) {
          cy.get(el.btnLimiteQtd).click()
          cy.wait(3000)
        }
      })
    }
    cy.get(el.btnSaveRegister).click()
    cy.wait(4000)
  }
}

export default new Coupon()
