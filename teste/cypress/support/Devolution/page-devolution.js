const el = require('./elements').elements
const elcli = require('../Client/elements').elements
import justNumbers from '../Utils/utils'
import { getLastSegment } from '../Utils/utils'
import UserGuide from '../User-Guide/page-user-guide'

class Devolution {
  StartDevolution() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.contains('button', ' Cliente ').click()
    cy.get(el.btnInputClient).click()
    cy.get(el.inputClient).type(Cypress.env('client') + '{enter}', { delay: 0 })
    /*cy.wait(7000)
        cy.contains('span', 'Robertim da Silva').click()*/
    cy.wait(5000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.contains('button', ' Continuar devolução ').click()
  }
  DevolutionInformingSale() {
    cy.get(el.btnSelectSale).first().click()
    cy.wait(3000)
    cy.get('body').then(($body) => {
      if ($body.find('div[class="row checkAllDiv"]').length > 0) {
        cy.get(el.checkboxCheckAll).click()
      } else {
        cy.contains('button', ' Devolver').click()
      }
    })

    cy.contains('button', ' Continuar ').click()
    cy.wait(8000)
  }
  DevolutionWithoutInformingSale() {
    cy.get(el.btnDevolutionWithoutInformingSale).click()
  }
  AddProductBarcode(barcode = []) {
    barcode.forEach((cod) => {
      cy.get(el.inputProduct)
        .clear()
        .type(cod + '{enter}')
      cy.wait(3000)
    })
  }
  AddProductConsult(barcode = []) {
    barcode.forEach((cod) => {
      cy.get(el.btnConsultProduct).click()
      cy.get(el.inputConsultProduct).type(cod)
      cy.wait(2000)
      cy.get(el.checkboxSelectProduct).first().click()
      cy.contains('button', ' Concluir ').click()
      cy.wait(3000)
    })
  }
  ContinueDevolution() {
    cy.contains('button', ' Continuar ').click()
    cy.wait(8000)
  }
  GeneratesCoupons() {
    cy.get(el.btnGeneratesCoupons).click()
    cy.wait(3000)
    cy.get(el.printCoupons).should('be.visible')
    cy.get('body').click()
    cy.get(el.bntClosedInvoices).first().click()
    cy.wait(2000)
    cy.get(el.bntClosedInvoices).click()
  }
  ReturnMoney() {
    cy.get(el.btnReturnMoney).click()
    cy.get(el.btnComfirmReturnMoney).click()
    cy.wait(3000)
    cy.get(el.bntClosedInvoices).click()
  }
  AlterInformations(employDevolution = Cypress.env('employ')) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.get(el.btnHistoricDevolution).click()
    cy.wait(4000)
    cy.get(el.btnOptiondevolution).click()
    cy.get(el.btnOptionAlterInformation).click()
    cy.get(el.btnEraseEmployDevolution).click()
    cy.get(el.inputEmployeDevolution).type(`${employDevolution}{enter}`, { delay: 0 })
    cy.wait(3000)
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/exchange/historic-list-form?isExchange=false`,
    ).as('alterinformation')
    cy.contains('button', ' Salvar ').click()
    cy.wait('@alterinformation').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.valueEmployeDevolution)
      .invoke('text')
      .then((employe) => {
        expect(employe.trim()).be.eq(employDevolution)
      })
  }
  StartDevolutionByCardPresent(cardPresent) {
    if (cardPresent == undefined) {
      cy.url().then((currentUrl) => {
        const lastSegment = getLastSegment(currentUrl)
        const token = localStorage.getItem('token') // mudar para variavel de ambiente
        cy.log(token)
        cy.request({
          method: 'GET',
          url: `${Cypress.env(
            'urlApi',
          )}/api/gift-voucher-product-tag/movement-group/${lastSegment}`,
          headers: {
            Gumgatoken: token,
          },
        }).then((resp) => {
          const data = resp.body
          cardPresent = data[0].barCode
          cy.visit(Cypress.env('urlApp'))
          cy.get(el.btnShowItens).click()
          cy.get(el.tabDevolution).click()
          cy.get(el.inputDevolutionCardPresent).type(cardPresent + '{enter}')
        })
      })
    } else {
      cy.visit(Cypress.env('urlApp'))
      cy.get(el.btnShowItens).click()
      cy.get(el.tabDevolution).click()
      cy.get(el.inputDevolutionCardPresent).type(cardPresent + '{enter}')
    }
    cy.contains('button', ' Continuar troca ').click()
    cy.wait(3000)
  }
  GetValueFinance() {
    cy.get(el.tabCashier).click()
    cy.wait(4000)
    cy.contains('label', ' Conta Dinheiro ')
      .children()
      .invoke('text')
      .then((vlr) => {
        Cypress.env('valueMoney', justNumbers(vlr))
      })
  }
  ValidateValueFinanceDevolution(isChargeback = false) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.get(el.btnHistoricDevolution).click()
    cy.wait(4000)
    cy.get(el.valueDevolution)
      .invoke('text')
      .then((vlr) => {
        cy.get(el.tabCashier).click()
        cy.wait(4000)
        cy.contains('label', ' Conta Dinheiro ')
          .children()
          .invoke('text')
          .then((vlrm) => {
            if (isChargeback) {
              expect(justNumbers(vlrm)).to.eq(Cypress.env('valueMoney'))
            } else {
              expect(justNumbers(vlrm)).to.eq(Cypress.env('valueMoney') - justNumbers(vlr))
            }
          })
      })
  }
  ChargeBackDevolution() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.get(el.btnHistoricDevolution).click()
    cy.wait(4000)
    cy.get(el.btnOptiondevolution).click()
    cy.get(el.btnOptionChargeback).click()
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/exchange/historic-list-form?isExchange=false`,
    ).as('chargeback')
    cy.get(el.btnConfirmChargeback).click()
    cy.wait('@chargeback').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  ValidateCouponDevolution(isChargeback = false) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.get(el.btnHistoricDevolution).click()
    cy.wait(4000)
    cy.get(el.valueDevolution)
      .invoke('text')
      .then((vlr) => {
        cy.get(elcli.tabClient).click()
        cy.get(elcli.inputSearchClient).type(Cypress.env('clientNameComplete'), { delay: 400 })
        cy.wait(3000)
        cy.get('.table > tbody > tr.ng-scope > :nth-child(1)')
          .invoke('text')
          .then((value) => {
            const idClient = justNumbers(value)
            const token = localStorage.getItem('token')
            cy.request({
              method: 'GET',
              url: `${Cypress.env(
                'urlApi',
              )}/api/discount-coupon/get-credit-coupon-customer/${idClient}?recipientType=CLIENT`,
              headers: {
                Gumgatoken: token,
              },
            }).then((resp) => {
              if (isChargeback) {
                expect(resp.body).to.eq(Cypress.env('valueCoupon'))
              } else {
                expect(resp.body).to.eq(
                  Cypress.env('valueCoupon') + Math.round(justNumbers(vlr) / 100),
                )
              }
            })
          })
      })
  }
}

export default new Devolution()
