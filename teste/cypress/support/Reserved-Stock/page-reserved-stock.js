const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class ReservedStock {
  MakeReservedStock(isBranch = false) {
    cy.get(el.tabReserved).click()
    if (isBranch) {  
      cy.get(el.selectTypePerson).select('Filiais')
      cy.get(el.inputClientReserved).type(Cypress.env('secondBranch')+'{enter}', { delay: 0 })
      cy.wait(5000)
    } else {
      cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
      cy.wait(5000)
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
          cy.contains('button', ' Fechar ').click()
        }
      })
      cy.wait(5000)
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-modal').length > 0) {
          cy.get('.btn > .fas').click()
        }
      })
    }
    cy.get(el.btnNewReserved).click()
    cy.get(el.btnInputEmployee).click()
    cy.get(el.inputEmployee).type(Cypress.env('employ')+'{enter}', { delay: 0 })
  }
  MakeDevolutionReservedStock(isBranch = false){
    cy.get(el.tabReserved).click()
    if (isBranch) {
      cy.get(el.selectTypePerson).select('Filiais')
      cy.get(el.inputClientReserved).type(Cypress.env('secondBranch')+'{enter}', { delay: 0 })
      cy.wait(5000)
    } else {
      cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
      cy.wait(5000)
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
          cy.contains('button', ' Fechar ').click()
        }
      })
      cy.wait(5000)
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-modal').length > 0) {
          cy.get('.btn > .fas').click()
        }
      })
    }
    cy.get(el.btnDevolutionReserved).click()
    cy.get(el.btnInputEmployee).click()
    cy.get(el.inputEmployee).type(Cypress.env('employ')+'{enter}', { delay: 0 })
  }
  AddProductBarcode(barcode = []) {
    barcode.forEach((cod) => {
      if(Cypress.env('principalBranch').trim() === "Teste Rai"){
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + '{enter}')
        cy.wait(3000)
      }else{
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + '{enter}')
        cy.wait(3000)
      }
    })

  }
  AddProductConsult(barcode = []) {
    barcode.forEach((cod) => {
      cy.get(el.btnConsultProduct).click()
      cy.get(el.inputConsultProduct).type(cod)
      cy.wait(2000)
      cy.get(el.checkboxSelectProduct).first().click()
      cy.wait(2000)
      cy.contains('button', ' Concluir ').click()
      cy.wait(3000)
    })
  }
  FinishReserved() {
    cy.contains('span', ' Finalizar ').click()
    cy.get(el.msgSuccess).should('be.visible')
    cy.wait(7000)
  }
  FinishDevolutionReserved() {
    cy.intercept("POST", `${Cypress.env('urlApi')}/api/movementgroup`).as('devolution')
    cy.contains('span', ' Devolver ').click()
    cy.wait('@devolution').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.msgSuccess).should('be.visible')
    cy.wait(7000)
  }
  PrintReserved() {
    cy.get(el.tabReserved).click()
    cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/genericreport/getdefault/PRINT_RESERVED_STOCK`,
    ).as('printReserved')
    cy.get(el.btnPrint).first().click()
    cy.wait('@printReserved').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get('.report-iframe').should('be.visible')
  }
  ContinueGenerateSale() {
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateSale).click()
    cy.contains('div', ' Salvo com sucesso ').should('be.visible')
    cy.wait(4000)
  }
  GenerateSale() {
    cy.get(el.tabReserved).click()
    cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateSale).click()
    cy.contains('div', ' Salvo com sucesso ').should('be.visible')
    cy.wait(4000)
  }
  ContinueGenerateConsigment() {
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateConsigment).click()
    cy.contains('div', ' Salvo com sucesso ').should('be.visible')
    cy.wait(4000)
  }
  GenerateConsigment() {
    cy.get(el.tabReserved).click()
    cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateConsigment).click()
    cy.contains('div', ' Salvo com sucesso ').should('be.visible')
    cy.wait(4000)
  }
  ContinueGenerateTransfer() {
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateTransfer).click()
    cy.wait(14000)
  }
  GenerateTransfer() {
    cy.get(el.tabReserved).click()
    cy.get(el.selectTypePerson).select('Filiais')
    cy.get(el.inputClientReserved).type('Grands Sistemas Lt{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get(el.checkboxReserved).first().click()
    cy.get(el.btnGenerateTransfer).click()
    cy.wait(14000)
  }
  ChargebackReserved() {
    cy.get(el.tabReserved).click()
    cy.get(el.btnChargeback).first().click()
    cy.get(el.btnConfirm).click()
    cy.wait(3000)
  }
  GenerateNewReserved() {
    cy.get(el.tabReserved).click()
    cy.get(el.btnGenerateNewReserved).first().click()
    cy.get(el.btnConfirm).click()
    cy.wait(3000)
  }
  SaveReserved(){
    cy.get(el.btnSaveReserved).click()
    cy.wait(5000)
    cy.get(el.btnHistoricReserved).click()
    cy.wait(4000)

  }
  ContinueCancelReserved(motive= "testes") {
    cy.get(el.btnCancelReserved).first().click()
   
      cy.get(el.inputMotiveCancel).type(motive)
    
    cy.intercept("PUT", `${Cypress.env('urlApi')}/api/movementgroup/*`).as('cancel')
    cy.get(el.btnConfirmCancel).click()
    
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  CancelReserved(motive= "testes") {
    cy.get(el.tabReserved).click()
    cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.btnCancelReserved).first().click()
    
      cy.get(el.inputMotiveCancel).type(motive)
    
    cy.intercept("PUT", `${Cypress.env('urlApi')}/api/movementgroup/*`).as('cancel')
    cy.get(el.btnConfirmCancel).click()
    
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  ContinueEditReserved() {
    cy.get(el.btnEditReserved).first().click()
    cy.wait(6000)
  
  }
  EditReserved() {
    cy.get(el.tabReserved).click()
    cy.get(el.inputClientReserved).type(Cypress.env('client')+'{enter}', { delay: 0 })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.btnEditReserved).first().click()
    cy.wait(6000)
  }
}

export default new ReservedStock()
