import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class KitProduct {
  StartNewKitProduct(){
    cy.get(el.tabKitProduct).click()
    cy.get(el.btnRegister).click()
    cy.get(el.inputCategory).first().type('camisa{enter}', { delay: 900 })
    cy.get(el.navLinkBarcode).click()
    cy.get(el.navLinkDataKit).click()
    cy.get(el.btnRenameKit).click()
    cy.get(el.inputNameKit).children('input').clear().type(`Camisa ${faker.music.songName()}`)
    cy.get('body').click()
  }
  AddProductBarcode(codbarras = [], quantity = 1) {
    codbarras.forEach((cod) => {
      if (Cypress.env('principalBranch').trim() === "Teste Rai") {
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + '{enter}')
        cy.wait(2000)
        cy.get(el.inputQuantity).first().clear().type(quantity)
        cy.wait(3000)
      } else {
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + '{enter}')
        cy.wait(2000)
        cy.get(el.inputQuantity).first().clear().type(quantity)
        cy.wait(3000)
      }

    })
  }
  FinishCreateKitProduct(){
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/v2/product?upkeepMotivation=true`).as('product')
    cy.contains('button',' Salvar ').click()
    cy.wait('@product', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  DeleteKitProduct(){
    cy.get(el.tabKitProduct).click()
    cy.get(el.btnOption).first().click()
    cy.get(el.btnOptionDelete).first().click()
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/v2/product/remove/*`).as('deletekit')
    cy.contains('button',' Sim ').click()
    cy.wait('@deletekit', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  StartsEditKitProdutct(){
    cy.get(el.tabKitProduct).click()
    cy.get(el.btnEdit).first().click()
    cy.wait(4000)
  }
  FinishEditKitProduct(){
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/v2/product/update/*`).as('editkit')
    cy.contains('button',' Salvar ').click()
    cy.wait('@editkit', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
}

export default new KitProduct()
