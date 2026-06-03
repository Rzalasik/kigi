import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class ProductType {
  AccessProductType(){
    cy.get(el.btnSeeMore).click()
    cy.get(el.tabProductType).click()
  }
  
  MakeRegisterProductType( segment = 'Moda', category = 'Roupas') {
    const nameRandom = faker.word.sample()
    
    cy.get(el.btnRegister).click()
    cy.get(el.btnInputSegment).click()
    cy.get(el.inputSegment).type(`${segment}{enter}`)
    cy.wait(3000)
    cy.get(el.btnInputCategory).click()
    cy.get(el.inputCategory).type(`${category}{enter}`)
    cy.get(el.inputProductType).type(nameRandom)
    cy.get(el.btnAddProductType).click()
    cy.get(el.productTypeList).should('be.visible')
  }
  FinishRegisterProductType(){
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/product-tree`).as('create')
    cy.get(el.btnSaveProductType).click()
    cy.wait('@create').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
  AccessLastPage(){
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/product-tree/gquery`).as('list')
    cy.get(el.btnLastPage).click()
    cy.wait('@list')
  } 
  DeleteProductType(){
    cy.get(el.btnDeleteProductType).last().click()
    cy.intercept('DELETE',`${Cypress.env('urlApi')}/api/product-tree/*`).as('delete')
    cy.contains('button', ' Sim ').click()
    cy.wait('@delete').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
}

export default new ProductType()
