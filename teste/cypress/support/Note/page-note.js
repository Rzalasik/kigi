const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Note {
  AccessSingleNote() {
    cy.get(el.btnSeeMore).click()
    cy.get(el.tabSingleNote).click()
  }
  MakeSingleNote(operation, bySale = false) {
    cy.get(el.btnInputOperation).click()
    cy.get(el.inputOperation).type(`${operation}{enter}`, { delay: 0 })
    cy.wait(2000)
    cy.get(el.inputClient).type(`${Cypress.env('clientNameComplete')}{enter}`)
    cy.wait(2000)
    cy.intercept(
      'POST',
      'https://staging-api.kigi.com.br/export-api/stock-item/search-by-barcodes/*',
    ).as('waitResponse')
    cy.get(el.btnApply).click()
    if (bySale) {
      cy.wait('@waitResponse', { timeout: 90000 })
    }
  }
  AddProductBarcode(codbarras = []) {
    codbarras.forEach((cod) => {
      if (Cypress.env('principalBranch').trim() === 'Teste Rai') {
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
  CacncelNFE() {
    cy.get(el.tabNote).click()
    cy.wait(3000)
    cy.get(el.btnOptionNote).click()
    cy.get(el.btnOptionCancel).click()
    cy.get(el.inputMotive).type('Dados da nota fiscal incorretos')
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/cancelar`).as('cancel')
    cy.contains('button', ' Salvar ').click()
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  AccessHoistoricSingleNote() {
    cy.get(el.btnHistoricSingleNote).click()
    cy.wait(5000)
  }
  ExecuteActionsHistoricSingleNte(chargeback = false, isAutorized = false) {
    if (chargeback) {
      cy.get(el.btnChargebackNoteHistoric).click()
      cy.intercept('PUT', `${Cypress.env('urlApi')}/api/movementgroup/*`).as('chargeback')
      cy.contains('button', ' Sim ').click()
      if (isAutorized) {
        cy.get(el.inputMotive).type('Dados da nota fiscal incorretos')
        cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/cancelar`).as('cancel')
        cy.contains('button', ' Salvar ').click()
        cy.wait('@cancel').then((interception) => {
          expect(interception.response.statusCode).to.equal(200)
        })
        cy.get(el.btnClosedStatusNote).click()
        cy.wait('@chargeback').then((interception) => {
          expect(interception.response.statusCode).to.equal(200)
        })
      } else {
        cy.wait('@chargeback').then((interception) => {
          expect(interception.response.statusCode).to.equal(200)
        })
      }
    } else {
      cy.get(el.btnSendNoteHistoric).click()
    }
  }
  GenerateNewSingleNoteByChargeback() {
    cy.get(el.btnGenerateNewSingleNote).click()
    cy.contains('button', ' Sim ').click()
    cy.wait(5000)
  }
  FinishSingleNote() {
    cy.get(el.btnFinishSingleNote).click()
    cy.wait(3000)
  }
  MakeSingleNoteByMoviment(operation) {
    cy.get(el.btnInputOperation).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/operationtype/gquery`).as(
      'loadNoteOperation',
    )
    cy.get(el.inputOperation).type(`${operation}{enter}`, { delay: 0 })
    cy.wait('@loadNoteOperation', { timeout: 50000 })
    cy.wait(1000)
    cy.get(el.btnApply).click()
    cy.wait(1000)
    cy.get(el.btnFinishSingleNote).click()
  }
  SendNFE(isError = false) {
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    if (isError) {
      cy.wait('@nfe').then((interception) => {
        expect(interception.response.statusCode).to.equal(500)
      })
    } else {
      cy.wait('@nfe').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.get(el.printInvoice).should('be.visible')
    }
  }
  SendNFCE() {
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfce')
    cy.get(el.btnSendNfce).click()
    cy.wait('@nfce').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
  }
  CloseModalNote(){
    cy.contains('button','Fechar ').click()
    cy.get(el.bntClosedInvoice).click()
  }
  UnuseNote() {
    cy.get(el.tabNote).click()
    cy.wait(3000)
    cy.get(el.btnOptionNote).click()
    cy.get(el.btnOptionUnuseNote).click()
    cy.get(el.inputMotive).type('Dados da nota fiscal incorretos')
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/inutilizar`).as('unuse')
    cy.contains('button', ' Salvar ').click()
    cy.wait('@unuse').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
}
export default new Note()
