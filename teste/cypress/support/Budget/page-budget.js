const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Budget {
  MakeBudgetOrder(hasEmploy = true, hasGuide = true ){
    cy.get(el.btnShowItens).click()
    cy.get(el.tabBudget).click()
    cy.get(el.eraseNameClient).click()
    cy.get(el.inputClient).type(Cypress.env('client') + '{enter}', { delay: 0 })
    cy.wait(6000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(6000)
    cy.get('body').then(($body) => {
      if ($body.find('.total-credit').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    if(hasEmploy){
      cy.get(el.btnInputEmployee).click()
      cy.get(el.inputEmployee).type(Cypress.env('employ') + '{enter}', { delay: 0 })
    }
    if(hasGuide){
      cy.get(el.btnInputGuide).click()
      cy.get(el.inputGuide).type(Cypress.env('guide') + '{enter}', { delay: 0 })
    }
  }
  AddProductBarcode(codbarras = []) {
    codbarras.forEach((cod) => {
      if (Cypress.env('principalBranch').trim() === "Teste Rai") {
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + '{enter}')
        cy.wait(3000)
      } else {
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + '{enter}')
        cy.wait(3000)
      }

    })
  }
  AddproductConsult(codbarras = []) {
    codbarras.forEach((cod) => {
      cy.get(el.btnConsultProduct).click()
      cy.get(el.inputConsultProduct).type(cod)
      cy.wait(2000)
      cy.get(el.checkboxSelectProduct).first().click()
      cy.contains('button', ' Concluir ').click()
      cy.wait(3000)
    })
  }
  SaveBudget(){
    cy.get(el.btnSaveBudget).click()
    cy.get(el.msgSuccess).should('be.visible')
    cy.wait(3000)
  }
  CancelBudget(motive = 'Cancelamento por teste'){
    cy.get(el.btnOptionHistoric).click()  
    cy.get(el.btnCancel).click()
    cy.get(el.inputMotiveCancel).type(motive)
    cy.intercept('PUT',`${Cypress.env('urlApi')}/api/movementgroup/*`).as('cancel')
    cy.get(el.btnConfirmCancel).click()
    cy.wait('@cancel').then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
  BillingBudget(){
    cy.get(el.btnOptionHistoric).click()  
    cy.get(el.btnBilling).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/sale/*`).as('billing')
    cy.contains('button',' OK ').click()
    cy.wait('@billing').then((intercept)=>{
      expect(intercept.response.statusCode).be.eq(200)
    })

  }
  EditBudget(alterEmploy = false, employ){
    cy.get(el.btnOptionHistoric).click() 
    cy.get(el.btnEdit).click()
    cy.wait(3000)
    if(alterEmploy){
      cy.get(el.eraseEmploy).click()
      cy.get(el.inputEmployee).type(employ + '{enter}', { delay: 0 })
    }

  }

}

export default new Budget()
