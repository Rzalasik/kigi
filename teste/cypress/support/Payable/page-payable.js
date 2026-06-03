const el = require('./elements').elements
const elStock = require('../Stock/elements').elements
import justNumbers from '../Utils/utils'

class Payable {
  PayAPayable(search = Cypress.env('provider')) {
    cy.get(el.tabPay).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.get(el.inputSearchPay).type(search)
    cy.wait(['@loadSearch', '@loadInformation'], { timeout: 30000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCheck')
    cy.get(el.checkboxChoicePay).first().click()
    cy.wait('@loadCheck')
    cy.contains('button', ' Pagar ').click()
    cy.wait(2000)
    cy.wait('@loadInformation', { timeout: 20000 })
  }
  PayAPayableByMoviment() {
    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/movementgroup/list-entry-reversal?categories=SIMPLE_ENTRY,XML_ENTRY&index=0&maxResults=1&param=`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      const idMovimentReceipt = JSON.stringify(data.body.values[0].id)
      cy.get(el.tabPay).click()
      cy.get(el.selectTypeFilter).select('Doc, nome..')
      cy.intercept(
        'POST',
        `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
      ).as('loadSearch')
      cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
      cy.get(el.inputSearchPay).type(idMovimentReceipt)
      cy.wait(['@loadSearch', '@loadInformation'], { timeout: 65000 })
      cy.get(el.checkboxChoicePay).first().click()
      cy.wait(2000)
      cy.intercept('GET', `${Cypress.env('urlApi')}/api/person/*`).as('loadPagePayment')
      cy.contains('button', ' Pagar ').click()
      cy.wait('@loadPagePayment', { timeout: 65000 })
    })
  }
  EditPay(nmrDocument) {
    cy.get(el.tabCreateEditPay).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.get(el.inputSearchPay).type(nmrDocument)
    cy.wait(['@loadSearch', '@loadInformation'], { timeout: 20000 })
    cy.get(el.btnOptionsPay).click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/dre-configuration/get-single`,
    ).as('loadTitle')
    cy.get(el.btnEditPay).click()
    cy.wait('@loadTitle', { timeout: 50000 })
  }
  AlterInformationValues(vlr, quantity, expiration) {
    if (vlr != 0) {
      cy.get(el.inputEditTotalValue).clear().type(vlr)
      cy.get(el.btnEraseCategory).each((Erase) => {
        cy.wrap(Erase).click()
      })
    }
    if (quantity != 0) {
      cy.get(el.inputEditQuantity).clear().type(quantity)
    }
    if (expiration != 0) {
      cy.get(el.inputEditExpiration)
        .clear()
        .type(expiration + '{enter}')
    }
  }

  //Pate de faturamento
  //faturamento dinheiro
  PaymentMoneyTotal() {
    cy.get(el.btnPaymentMoney).click()
    cy.get(el.btnAddPaymentMoney).click()
  }
  PaymentMoneyPartial(vlr) {
    cy.get(el.btnPaymentMoney).click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentMoney).click()
  }
  //faturamento Conta bancaria
  PaymenteCheckingAccountTotal() {
    cy.get(el.btnPaymentCheckingAccount).click()
    cy.get(el.selectAccount).click()
    cy.wait(3000)
    cy.contains('span', 'PIX').click()
    cy.get(el.btnAddPaymentCheckingAccount).click()
  }
  PaymenteCheckingAccountPartial(vlr) {
    cy.get(el.btnPaymentCheckingAccount).click()
    cy.get(el.selectAccount).click()
    cy.wait(3000)
    cy.contains('span', 'PIX').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentCheckingAccount).click()
  }
  //faturamento cheque de terceiros
  PaymentCheckThird() {
    cy.get(el.btnPaymentCheckThird).click()
    cy.get(el.selectCheckThird).click()
    cy.get(el.inputCheckThird).type(`${Cypress.env('client')}`, { delay: 500 })
    cy.contains('span', Cypress.env('clientNameComplete')).click()
    cy.get(el.btnAddPaymentCheckThird).click()
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($vlr) => {
        var TotalValue = justNumbers($vlr)
        if (TotalValue > 0) {
          cy.get('body').then(($body) => {
            if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
              cy.get(':nth-child(1) > .btn-confirm-alert > .ng-binding').click()
              this.PaymentMoneyTotal()
            }
            if ($body.find('h3[class="ng-binding"]').length == 0) {
              cy.log($body.find('h3[class="ng-binding"]').length)
              this.PaymentCheckThird()
            }
          })
        }
      })
  }
  //faturamento Crédito na loja
  PaymentTreasuryAccountTotal() {
    cy.get(el.btnPaymentTreasuryAccount).click()
    cy.get(el.btnAddPaymentTreasuryAccount).click()
  }
  PaymentTreasuryAccountPartial(vlr) {
    cy.get(el.btnPaymentTreasuryAccount).click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentTreasuryAccount).click()
  }
  //Faturamento Credito para fornecedor
  PaymentCouponProvider() {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/discount-coupon/gquery`).as('loadCoupons')
    cy.get(el.btnPaymentCoupon).click()
    cy.wait('@loadCoupons', { timeout: 45000 })
    cy.get(el.checkBoxCoupons).eq(2).click()
    cy.get(el.btnAddPaymentCoupon).click()
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($vlr) => {
        var TotalValue = justNumbers($vlr)
        if (TotalValue > 0) {
          this.PaymentCouponProvider()
        }
      })
  }
  //Faturamento cheque
  PaymentCheckTotal(numberCheque) {
    cy.get(el.btnPaymentCheck).click()
    cy.get(el.selectAccountCheck).click()
    cy.wait(3000)
    cy.contains('span', 'PIX').click()
    cy.get(el.inputNumberCheck).type(numberCheque)
    cy.get(el.btnAddPaymentCheck).click()
  }
  PaymentCheckPartial(vlr, numberCheque) {
    cy.get(el.btnPaymentCheck).click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.selectAccountCheck).click()
    cy.wait(3000)
    cy.contains('span', 'PIX').click()
    cy.get(el.inputNumberCheck).type(numberCheque)
    cy.get(el.btnAddPaymentCheck).click()
  }

  //Faturamento cartão de crédito
  PaymentCardCreditPartial(vlr, parcels, flags, nsu) {
    cy.get(el.btnPaymentCard).click()
    cy.wait(3000)
    cy.contains('button', 'Crédito ').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.get(el.inputNumberParcelsCheckCard).first().type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  PaymentCardCreditTotal(parcels, flags, nsu) {
    cy.get(el.btnPaymentCard).click()
    cy.wait(3000)
    cy.contains('button', 'Crédito ').click()
    cy.get(el.inputNumberParcelsCheckCard).first().type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  //Faturamento cartão de débito
  PaymentCardDebitPartial(vlr, flags, nsu) {
    cy.get(el.btnPaymentCard).click()
    cy.wait(3000)
    cy.contains('button', 'Débito ').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  PaymentCardDebitTotal(flags, nsu) {
    cy.get(el.btnPaymentCard).click()
    cy.wait(3000)
    cy.contains('button', 'Débito ').click()
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }

  FinishPayment() {
    cy.get(el.bntBill).click()
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Estou ciente ').click()
      }
    })
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.contains('button', ' Cancelar ').click()
    cy.wait('@loadSearch')
  }
  FinishPaymentCoupon() {
    cy.get(el.bntBill).click()
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Estou ciente ').click()
      }
    })
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get('body').click()
    cy.wait('@loadSearch')
  }
  //Parte de desconto

  ApplyDiscount(desconto) {
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($desc) => {
        Cypress.env('valueWithoutDiscount', justNumbers($desc))
        cy.log(Cypress.env('valueWithoutDiscount'))
      })
    cy.get(el.btnDiscount).click()
    cy.get(el.inputDiscount).clear().type(desconto)
    cy.get(el.btnConfirmDiscount).click()
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($desc) => {
        expect(justNumbers($desc)).to.eq(Cypress.env('valueWithoutDiscount') - desconto)
      })
  }

  //Parte do Acrescimo
  ApplyAddition(addition) {
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($acres) => {
        Cypress.env('valueWithoutAddition', justNumbers($acres))
      })
    cy.get(el.btnAddition).click()
    cy.get(el.inputAddition).clear().type(addition)
    cy.get(el.btnSaveAddition).click()
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($acres) => {
        expect(justNumbers($acres)).to.eq(Cypress.env('valueWithoutAddition') + addition)
      })
  }
  FinishPaymentPrint() {
    cy.get(el.bntBill).click()
    cy.contains('button', ' Sim ').click()
    cy.get(el.Receipt).should('be.visible')
  }
  RegisterSingleTitle(
    number,
    vlrtotal,
    qtdparcels,
    expiration,
    provider = Cypress.env('provider'),
  ) {
    cy.get(el.tabCreateEditPay).click()
    cy.get(el.btnCreateNewReceivable).click()
    cy.get(el.inputNumberDocument).type(number)
    cy.get(el.btnInputClient).click()
    cy.get(el.inputClient).type(provider + '{enter}', { delay: 0 })

    cy.contains('span', 'Ex. Boleto, Carnê etc..').click()
    cy.wait(2000)
    cy.contains('span', 'Tipo de Documento Padrão').click()
    cy.get(el.inputFirstExpiration).type(expiration)
    cy.get(el.inputTotalValue).type(vlrtotal)
    cy.get(el.inputQtdParcels).type(qtdparcels)
  }
  DeleteTitle(nmrDocument) {
    cy.get(el.tabCreateEditPay).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.inputSearchPay).type(nmrDocument)
    cy.wait('@loadSearch', { timeout: 45000 })
    cy.get(el.btnOptionsPay).click()
    cy.contains('span', 'Excluir').click()
    cy.wait(2000)
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/financeintegration/title/*`).as(
      'deletetitle',
    )
    cy.contains('button', 'Sim').click()
    cy.wait('@deletetitle').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('div', ' Título excluido com sucesso. ').should('be.visible')
  }

  InformFinancialCategory(vlr) {
    cy.get(el.selectFinancialCategory).click()
    cy.get(el.optionFinancialCategory).first().click()
    cy.get(el.inputValueFinancialCategory).last().type(vlr)
  }
  AlterFirstParcel(parcels, qtdTotal, vlr, vlrtotal, replyValue) {
    cy.get(el.inputValueParcels)
      .eq(parcels - 1)
      .type(vlr + '{enter}')
    cy.log(replyValue)
    if (replyValue == 'sim') {
      cy.contains('button', ' Sim ').click()
      var valueValidation = 0

      if (parcels - 1 == 0) {
        for (let i = parcels; i <= qtdTotal; i++) {
          valueValidation += vlr
          cy.log(valueValidation)
        }
      } else {
        var vlrEachParcels = 0
        if (vlrtotal % qtdTotal == 1 && parcels != qtdTotal) {
          vlrEachParcels = vlrtotal / qtdTotal + 1
        } else if (vlrtotal % qtdTotal > 1 && parcels != qtdTotal) {
          vlrEachParcels = vlrtotal / qtdTotal - 1
        } else {
          vlrEachParcels = vlrtotal / qtdTotal
        }
        cy.log(vlrtotal % qtdTotal)
        valueValidation = vlrEachParcels * (parcels - 1)

        for (let i = parcels; i <= qtdTotal; i++) {
          valueValidation += vlr
        }
      }

      cy.get(el.vlrPay).should(
        'have.value',
        'R$ ' + (valueValidation / 100).toFixed(2).replace('.', ','),
      )
    } else {
      cy.contains('button', ' Não ').click()
      cy.get(el.vlrPay).should('have.value', 'R$ ' + (vlrtotal / 100).toFixed(2).replace('.', ','))
    }
  }
  SaveSingleTitle(InformCategoryFinancy) {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/financeintegration/title/only-save`).as(
      'saveTitle',
    )
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.contains('button', ' Salvar ').click()
    cy.wait(1000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        if (InformCategoryFinancy == true) {
          cy.contains('button', ' Informar Categoria ').click()
        } else {
          cy.contains('button', ' Continuar sem informar ').click()
        }
      }
    })
    cy.wait(['@saveTitle', '@loadInformation'], { timeout: 20000 }).then((interception) => {
      expect(interception[0].response.statusCode).be.eq(200)
    })
  }
  ChargebackByMovement() {
    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/movementgroup/list-entry-reversal?categories=SIMPLE_ENTRY,XML_ENTRY&index=0&maxResults=1&param=`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      const idMovimentReceipt = JSON.stringify(data.body.values[0].id)
      cy.get(el.tabPayments).click()
      cy.get(el.selectTypeFilter).select('Doc, nome..')
      cy.intercept(
        'POST',
        `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
      ).as('loadSearch')
      cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
      cy.get(el.inputSearchPay).type(idMovimentReceipt)
      cy.wait(2000)
      cy.wait('@loadSearch', { timeout: 60000 })
      cy.get(el.btnOptionsPay).click()
      cy.get(el.btnPaymentPreview).click()
      cy.contains('button', 'Estornar').click()
      cy.wait(2000)
      cy.contains('button', ' Confirmar ').click()
      cy.get(el.msgChargeback).should('be.visible')
      cy.contains('button', 'Fechar ').click()
    })
  }
  ChargebackPayWithoutMotive(search = Cypress.env('provider')) {
    cy.get(el.tabPayments).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.inputSearchPay).type(search)
    cy.wait('@loadSearch', { timeout: 20000 })
    cy.get(el.btnOptionsPay).click()
    cy.get(el.btnPaymentPreview).click()
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.contains('button', 'Estornar').click()
    cy.wait('@loadInformation', { timeout: 20000 })
    cy.contains('button', ' Confirmar ').click()
    cy.get(el.msgChargeback).should('be.visible')
    cy.contains('button', 'Fechar ').click()
  }
  ChargebackPayWithMotive(motive, search = Cypress.env('provider')) {
    cy.get(el.tabPayments).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.get(el.inputSearchPay).type(search)
    cy.wait(['@loadSearch', '@loadInformation'], { timeout: 30000 })
    cy.get(el.btnOptionsPay).click()
    cy.get(el.btnPaymentPreview).click()
    cy.contains('button', 'Estornar').click()
    cy.wait('@loadInformation', { timeout: 20000 })
    cy.get(el.inputMotiveChargeback).type(motive)
    cy.contains('button', ' Confirmar ').click()
    cy.get(el.msgChargeback).should('be.visible')
    cy.contains('button', 'Fechar ').click()
  }
  MakeReparceling(nameTitle, selectAll) {
    cy.get(el.btnChangeTab).click()
    cy.get('body').then(($body) => {
      if ($body.find('.mb-smqm-menu').length == 0) {
        cy.get(el.btnChangeTab).click()
      }
    })
    cy.contains('div', 'Financeiro').click({ force: true })
    cy.get(el.btnShowItens).click()
    cy.get(el.tabReparceling).click()
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.intercept('POST', 'https://*.clarity.ms/collect').as('loadInformation')
    cy.get(el.inputSearchPay).type(nameTitle)
    cy.wait(['@loadSearch', '@loadInformation'])
    cy.get(el.checkboxSelectTitle).first().click()
    cy.get('body').then(($body) => {
      if ($body.find('.charge-checkbox').length > 1) {
        cy.get(el.checkboxSelectTitle).eq(1).click()
      }
    })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length == 1) {
        if (selectAll == 'sim') {
          cy.contains('button', ' Sim ').click()
          cy.wait(3000)
        } else {
          cy.contains('button', ' Não ').click()
          cy.wait(3000)
        }
      }
    })
    cy.get(el.btnReparceling).click()
    cy.wait(3000)
    cy.get(el.btnConfirmReparceling).click()
  }
  RegisterSingleTitleByReparceling(number, qtdparcels, expiration) {
    cy.get(el.inputNumberDocument).type(number)
    cy.contains('span', 'Ex. Boleto, Carnê etc..').click()
    cy.wait(2000)
    cy.contains('span', 'Tipo de Documento Padrão').click()
    cy.get(el.inputQtdParcels).type(qtdparcels)
    cy.get(el.inputFirstExpiration).type(expiration + '{enter}')
  }
  SaveSingleTitleByReparceling(InformCategoryFinancy) {
    cy.contains('button', ' Renegociar ').click()
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        if (InformCategoryFinancy == true) {
          cy.contains('button', ' Informar Categoria ').click()
        } else {
          cy.contains('button', ' Continuar sem informar ').click()
        }
      }
    })
  }
  //validação
  GetCreditCardValue() {
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/cashcheckin/getbycurrentcashcheckin?*`,
    ).as('loadPage')
    cy.get(el.tabCashier).click()
    cy.wait('@loadPage', { timeout: 40000 })
    cy.contains('label', ' Conta Cartão de Crédito Próprio: ')
      .children()
      .invoke('text')
      .then((value) => {
        Cypress.env('valueCreditCard', justNumbers(value))
        cy.log(Cypress.env('valueCreditCard'))
      })
  }
  ValidateCreditCardValue(isChargeback = true, value) {
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/cashcheckin/getbycurrentcashcheckin?*`,
    ).as('loadPage')
    cy.get(el.tabCashier).click()
    cy.wait('@loadPage', { timeout: 40000 })
    cy.contains('label', ' Conta Cartão de Crédito Próprio: ')
      .children()
      .invoke('text')
      .then((valueCredit) => {
        if (isChargeback) {
          expect(justNumbers(valueCredit)).to.eq(Cypress.env('valueCreditCard'))
        } else {
          cy.log(value)
          expect(justNumbers(valueCredit)).to.eq(Cypress.env('valueCreditCard') - value)
        }
      })
  }
  GetDebitCardValue() {
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/cashcheckin/getbycurrentcashcheckin?*`,
    ).as('loadPage')
    cy.get(el.tabCashier).click()
    cy.wait('@loadPage', { timeout: 40000 })
    cy.contains('label', ' Conta Cartão de Débito Próprio: ')
      .children()
      .invoke('text')
      .then((value) => {
        Cypress.env('valueDebitCard', justNumbers(value))
        cy.log(Cypress.env('valueDebitCard'))
      })
  }

  ValidateDebitCardValue(isChargeback = true, value) {
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/cashcheckin/getbycurrentcashcheckin?*`,
    ).as('loadPage')
    cy.get(el.tabCashier).click()
    cy.wait('@loadPage', { timeout: 40000 })
    cy.contains('label', ' Conta Cartão de Débito Próprio: ')
      .children()
      .invoke('text')
      .then((valueDebit) => {
        if (isChargeback) {
          expect(justNumbers(valueDebit)).to.eq(Cypress.env('valueDebitCard'))
        } else {
          expect(justNumbers(valueDebit)).to.eq(Cypress.env('valueDebitCard') - value)
        }
      })
  }
  ValidateChargeBackByReceipt(haveChargeback = true) {
    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/movementgroup/list-entry-reversal?categories=SIMPLE_ENTRY,XML_ENTRY&index=0&maxResults=1&param=`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      const idMovimentReceipt = JSON.stringify(data.body.values[0].id)
      // cy.get(el.tabCreateEditPay).click()
      // cy.wait(3000)
      // cy.get(el.selectTypeFilter).select('Doc, nome..')
      // cy.intercept('POST',`${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`).as('loadSearch')
      // cy.intercept('POST','https://*.clarity.ms/collect').as('loadInformation')
      // cy.get(el.inputSearchPay).type(idMovimentReceipt)
      // cy.wait(['@loadSearch','@loadInformation'],{timeout:20000})
      // cy.get('body').then($body =>{
      //   if(haveChargeback){
      //     expect($body.find(el.checkboxChoicePay).length).be.eq(0)
      //   }else{
      //     expect($body.find(el.checkboxChoicePay).length).not.be.eq(0)
      //   }
      // })
      cy.request({
        method: 'POST',
        url: `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
        headers: {
          Gumgatoken: localStorage.getItem('token'),
        },
        body: {
          queryDto: {
            query: idMovimentReceipt,
            typeFilter: 'TO_PAY',
            integrationId: '',
            individualId: '',
            phone: '',
            primaryDocument: '',
            filterDateType: 'tp.expiration',
            dateStart: null,
            dateFinish: null,
            type: 'PAY',
            nfeNumber: null,
          },
        },
      }).then((dataQuery) => {
        cy.log(dataQuery.body.values.length)
        if (haveChargeback) {
          expect(dataQuery.body.values.length).be.eq(0)
        } else {
          expect(dataQuery.body.values.length).not.be.eq(0)
        }
      })
    })
  }
}

export default new Payable()
