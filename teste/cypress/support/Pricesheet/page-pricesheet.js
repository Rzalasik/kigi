import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Pricesheet {
  AcessTabPriceSheet(){
    cy.get(el.btnSeeMore).click()
    cy.get(el.tabPricesheet).click()
  }
  CreatePriceSheet(isFixed = false, name = faker.music.songName(), tableBase="Padrão", coefficient=1000){
    cy.get(el.btnCreatePricesheet).click()
    isFixed ? cy.contains('span','Fixo') : cy.contains('span','Variável')
    cy.get(el.inputNamePricesheet).type(name)
    cy.get(el.btnInputTableBase).click()
    cy.get(el.inputTableBase).type(`${tableBase}{enter}`)
    cy.get(el.inputCoefficient).type(coefficient)
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/price-sheet-type/create-and-propagate?idPriceSheetType=*`).as('savePricesheet')
    cy.get(el.btnSavePricesheet).click()
    cy.wait('@savePricesheet').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(201)
    })
  }
  RemovePricesheet(){
    cy.get(el.btnRemovePricesheet).first().click()
    cy.intercept('DELETE',`${Cypress.env('urlApi')}/api/price-sheet-type/delete-all-price-sheet/*`).as('removePricesheet')
    cy.contains('button', ' Sim ').click()
    cy.wait('@removePricesheet').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
  EditPriceSheet(changeName=false, name=faker.music.songName()){
    cy.get(el.btnEditPricesheet).first().click()
    if(changeName){
      cy.get(el.inputNamePricesheet).type(name)
    }
    cy.intercept('PUT',`${Cypress.env('urlApi')}/api/price-sheet-type/*`).as('editPricesheet')
    cy.get(el.btnSavePricesheet).click()
    cy.wait('@editPricesheet').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
}

export default new Pricesheet()
