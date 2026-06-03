const el = require('./elements').elements
const elSale = require('../Sale/elements').elements
import justNumbers from '../Utils/utils'
import { CalcDiference } from '../Utils/utils'

class Receivable {
  ReceiveAReceivable(searchTitle = Cypress.env('client')) {
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.tabReceive).click()
    cy.wait('@loadSearch', { timeout: 50000 })
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.get(el.inputSearchReceive).type(searchTitle)
    cy.wait('@loadSearch')
    cy.get(el.checkboxChoiceReceivable).first().click()
    cy.contains('button', ' Receber ').should('not.be.disabled').click()
    cy.url().should('contain', '/commercial/payment-title/receive?ids=')
  }
  ReceiveAReceivableOfSale(payOtherTitle = false) {
    cy.get(elSale.tabSaleHistory).click()
    cy.get(elSale.numberSale)
      .invoke('text')
      .then((number) => {
        cy.log(number)
        cy.intercept(
          'POST',
          `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
        ).as('loadSearch')
        cy.get(el.tabReceive).click()
        cy.url().should('contain', '/finance/title-parcel-list/RECEIVE?operation=RECEIVE')
        cy.wait('@loadSearch', { timeout: 50000 })
        cy.wait(2000)
        cy.get(el.selectTypeFilter).select('Nº venda')
        cy.wait(1000)
        cy.get(el.inputSearchReceive).type(number)
        cy.wait('@loadSearch')
        cy.get(el.checkboxChoiceReceivable).first().click()
        if (payOtherTitle) {
          cy.get(el.selectTypeFilter).select('Doc, nome..')
          cy.wait(3000)
          cy.intercept(
            'POST',
            `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
          ).as('loadSearch')
          cy.get(el.inputSearchReceive).type(Cypress.env('client'))
          cy.wait(2000)
          cy.wait('@loadSearch')
          cy.get(el.checkboxChoiceReceivable).first().click()
          cy.wait(2000)
        }
        cy.contains('button', ' Receber ').click()
        cy.url().should('contain', '/commercial/payment-title/receive?ids=')
        cy.wait(2000)
      })
  }
  ValidateCreateTitleFromSale(haveChargeBack = false){
    cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/movementgroup/get-dto-sale-list?param=&operationCategory=SIMPLE_SALE&status=&from=&until=&page=1&maxResults=1&orderBy=mg.movementdate&orderStrategy=DESC`,
        headers: {
          Gumgatoken: localStorage.getItem('token'),
        }
    }).then((data) =>{
      cy.log(data.body.values[0].id)
      cy.intercept(
          'POST',
          `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
        ).as('loadSearch')
        cy.get(el.tabReceive).click()
        cy.url().should('contain', '/finance/title-parcel-list/RECEIVE?operation=RECEIVE')
        cy.wait('@loadSearch', { timeout: 50000 })
        cy.wait(2000)
        cy.get(el.inputSearchReceive).type(data.body.values[0].id)
        cy.wait('@loadSearch')
        cy.wait(2000)
        if(haveChargeBack){
          cy.get(el.checkboxChoiceReceivable).should('not.exist')
        }else{
          cy.get(el.checkboxChoiceReceivable).should('be.visible')
        }
    })
  }
  EditReceivable(nmrDocument) {
    cy.get(el.tabCreateEditReceivable).click()
    cy.wait(3000)
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.inputSearchReceive).type(nmrDocument)
    cy.wait(2000)
    cy.wait('@loadSearch', { timeout: 45000 })
    cy.get(el.btnOptionsReceivable).click()
    cy.get(el.btnEditReceivable).click()
  }
  DeleteTitle(nmrDocument) {
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.tabCreateEditReceivable).click()
    cy.wait('@loadSearch', { timeout: 50000 })
    cy.url().should('contain', '/finance/title-parcel-list/')
    cy.wait(2000)
    cy.get(el.selectTypeFilter).select('Doc, nome..')
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.inputSearchReceive).type(nmrDocument, { delay: 200 })
    cy.wait('@loadSearch', { timeout: 50000 })
    cy.get(el.btnOptionsReceivable).click()
    cy.get(el.btnOptionDelete).click()
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/financeintegration/title/*`).as(
      'deletetitle',
    )
    cy.contains('button', 'Sim').click()
    cy.wait('@deletetitle').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.contains('div', ' Título excluido com sucesso. ').should('be.visible')
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
    cy.wait(2000)
  }

  //Pate de faturamento
  //faturamento dinheiro
  PaymentMoneyTotal() {
    cy.contains('.payment-type-item', 'Dinheiro').should('be.visible').click()
    cy.get(el.btnAddPaymentMoney).click()
  }
  PaymentMoneyPartial(vlr) {
    cy.contains('.payment-type-item', 'Dinheiro').should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentMoney).click()
  }
  //faturamento depósito
  PaymenteDepositTotal() {
    cy.contains('.payment-type-item', 'Depósito').should('be.visible').click()
    cy.get(el.selectAccount).click()
    cy.contains('span', 'PIX', { timeout: 10000 }).should('be.visible').click()
    cy.get(el.btnAddPaymentDeposit).click()
  }
  PaymenteDepositPartial(vlr) {
    cy.contains('.payment-type-item', 'Depósito').should('be.visible').click()
    cy.get(el.selectAccount).click()
    cy.contains('span', 'PIX', { timeout: 10000 }).should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentDeposit).click()
  }
  //faturamento Crédito na loja
  PaymentCoupons() {
    cy.get(el.btnPaymentCoupons).click()
    cy.wait(4000)
    cy.get(el.checkBoxCoupons).eq(2).click()
    cy.get(el.btnAddPaymentCoupons).click()
    cy.get(el.TotalValue)
      .invoke('text')
      .then(($vlr) => {
        var TotalValue = justNumbers($vlr)
        if (TotalValue > 0) {
          this.PaymentCoupons()
        }
      })
  }

  //Faturamento cheque
  PaymentCheckTotal(parcels, dayExpiration, agencia, conta, numberCheque) {
    cy.contains('.payment-type-item', 'Cheque').should('be.visible').click()
    cy.get(el.inputNumberParcelsCheckCard).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(3000)
    cy.contains('li', '45').click()
    cy.get(el.selectExpirationCheck).click()
    cy.wait(3000)
    cy.get(el.inputDayExpiration).type(dayExpiration)
    cy.wait(3000)
    cy.contains('li', dayExpiration).last().click()
    cy.get(el.btnContinueCheck).click()
    cy.wait(2000)
    cy.get(el.BankCheck).click()
    cy.contains('li', '654 - Banco A.J.Renner S.A.').click()
    cy.get(el.inputAgencyCheck).type(agencia)
    cy.get(el.inputAccountCheck).type(conta)
    cy.get(el.inputNumberCheck).type(numberCheque)
    cy.get(el.btnConfirmCheck).click()
    cy.get(el.btnAddPaymentCheck).click()
  }
  PaymentCheckPartial(parcels, dayExpiration, vlr, agencia, conta, numberCheque) {
    cy.contains('.payment-type-item', 'Cheque').should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.inputNumberParcelsCheckCard).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(3000)
    cy.contains('li', '45').click()
    cy.get(el.selectExpirationCheck).click()
    cy.wait(3000)
    cy.get(el.inputDayExpiration).type(dayExpiration)
    cy.wait(3000)
    cy.contains('li', dayExpiration).last().click()
    cy.get(el.btnContinueCheck).click()
    cy.wait(2000)
    cy.get(el.BankCheck).click()
    cy.contains('li', '654 - Banco A.J.Renner S.A.').click()
    cy.get(el.inputAgencyCheck).type(agencia)
    cy.get(el.inputAccountCheck).type(conta)
    cy.get(el.inputNumberCheck).type(numberCheque)
    cy.get(el.btnConfirmCheck).click()
    cy.get(el.btnAddPaymentCheck).click()
  }

  //Faturamento cartão de crédito
  PaymentCardCreditPartial(vlr, parcels, flags, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.contains('button', /^Crédito(?! na)/).should('be.visible').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.get(el.inputNumberParcelsCheckCard).type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  PaymentCardCreditTotal(parcels, flags, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.contains('button', /^Crédito(?! na)/).should('be.visible').click()
    cy.get(el.inputNumberParcelsCheckCard).type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  //Faturamento cartão de débito
  PaymentCardDebitPartial(vlr, flags, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.contains('button', 'Débito ').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }
  PaymentCardDebitTotal(flags, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.contains('button', 'Débito ').click()
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flags) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
    }
  }

  FinishPayment() {
    cy.get(el.bntBill).click()
    cy.contains('button', ' Cancelar ').click()
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
    cy.wait(4000)
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
    cy.get('body').click()
  }
  RegisterSingleTitle(number, vlrtotal, qtdparcels, expiration) {
    cy.get(el.tabCreateEditReceivable).click()
    cy.get(el.btnCreateNewReceivable).click()
    cy.get(el.inputNumberDocument).type(number)
    cy.get(el.btnInputClient).click()
    cy.get(el.inputClient).type(Cypress.env('client') + '{enter}', { delay: 0 })

    cy.contains('span', 'Ex. Boleto, Carnê etc..').click()
    cy.wait(2000)
    cy.contains('span', 'Tipo de Documento Padrão').click()
    cy.get(el.inputFirstExpiration).type(expiration)
    cy.get(el.inputTotalValue).type(vlrtotal)
    cy.get(el.inputQtdParcels).type(qtdparcels)
  }
  InformFinancialCategory(vlr) {
    cy.get(el.selectFinancialCategory).last().click()
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

      cy.get(el.vlrReceivable).should(
        'have.value',
        'R$ ' + (valueValidation / 100).toFixed(2).replace('.', ','),
      )
    } else {
      cy.contains('button', ' Não ').click()
      cy.get(el.vlrReceivable).should(
        'have.value',
        'R$ ' + (vlrtotal / 100).toFixed(2).replace('.', ','),
      )
    }
  }
  SaveSingleTitle(InformCategoryFinancy) {
    cy.contains('button', ' Salvar ').click()
    cy.wait(2000)
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        if (InformCategoryFinancy == true) {
          cy.contains('button', ' Informar Categoria ').click()
        } else {
          cy.intercept(
            'POST',
            `${Cypress.env('urlApi')}/api/financeintegration/title/only-save`,
          ).as('saveTitle')
          cy.contains('button', ' Continuar sem informar ').click()
          cy.wait('@saveTitle', { timeout: 25000 }).then((intercept) => {
            expect(intercept.response.statusCode).be.eq(200)
          })
        }
      }
    })
  }

  ChargebackReceivable(motive, searchTitle) {
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.tabReceivable).click()
    cy.wait('@loadSearch', { timeout: 45000 })
    cy.url().should('contain', '/finance/title-parcel-list/')
    if (searchTitle != undefined) {
      cy.get(el.inputSearchReceive).type(searchTitle)
    } else {
      cy.get(el.inputSearchReceive).type(Cypress.env('client'))
    }
    cy.wait('@loadSearch', { timeout: 45000 })
    cy.get(el.btnOptionsReceivable).click()
    cy.get(el.btnPreviewReceive).click()
    cy.contains('button', 'Estornar').click()
    if (motive != undefined) {
      cy.get(el.inputMotiveChargeback).should('be.visible').type(motive)
    }
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
    cy.intercept(
      'POST',
      `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
    ).as('loadSearch')
    cy.get(el.inputSearchReceive).type(nameTitle)
    cy.wait('@loadSearch')
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
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/financeintegration/title/renegotiation`).as(
      'saveReparceling',
    )
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        if (InformCategoryFinancy == true) {
          cy.contains('button', ' Informar Categoria ').click()
          cy.wait(2000)
        } else {
          cy.contains('button', ' Continuar sem informar ').click()
          cy.wait('@saveReparceling')
        }
      }
    })
  }
  //Parte de validação
  GetCreditCardValue() {
    cy.get(el.tabCashier).click()
    cy.contains('label', ' Conta Cartão de Crédito: ')
      .children()
      .invoke('text')
      .then((value) => {
        Cypress.env('valueCreditCard', justNumbers(value))
        cy.log(Cypress.env('valueCreditCard'))
      })
  }
  ValidateCreditCardValue(isChargeback = true, value) {
    cy.get(el.tabCashier).click()
    cy.contains('label', ' Conta Cartão de Crédito: ')
      .children()
      .invoke('text')
      .then((valueCredit) => {
        if (isChargeback) {
          expect(justNumbers(valueCredit)).to.eq(Cypress.env('valueCreditCard'))
        } else {
          expect(justNumbers(valueCredit)).to.eq(Cypress.env('valueCreditCard') + value)
        }
      })
  }
  GetDebitCardValue() {
    cy.get(el.tabCashier).click()
    cy.contains('label', ' Conta Cartão de Débito: ')
      .children()
      .invoke('text')
      .then((value) => {
        Cypress.env('valueDebitCard', justNumbers(value))
        cy.log(Cypress.env('valueDebitCard'))
      })
  }
  ValidateDebitCardValue(isChargeback = true, value) {
    cy.get(el.tabCashier).click()
    cy.contains('label', ' Conta Cartão de Débito: ')
      .children()
      .invoke('text')
      .then((valueDebit) => {
        if (isChargeback) {
          expect(justNumbers(valueDebit)).to.eq(Cypress.env('valueDebitCard'))
        } else {
          expect(justNumbers(valueDebit)).to.eq(Cypress.env('valueDebitCard') + value)
        }
      })
  }
  ValidateChargeBackBySale() {
    cy.get(elSale.tabSaleHistory).click()
    cy.get(elSale.numberSale)
      .invoke('text')
      .then((number) => {
        cy.SearchTitleValidate(number)
      })
  }
  ValidadeToleranceDay(searchTitle, dateExperation) {
    const date = new Date()
    let dateToday = date.toLocaleDateString()
    if (dateToday.length <= 7) {
      dateToday = '0' + dateToday
    }
    dateToday = dateToday.replace(/[^0-9-]/g, '')
    if (searchTitle != undefined) {
      cy.get(el.tabCreateEditReceivable).click()
      cy.get(el.selectTypeFilter).select('Doc, nome..')
      cy.wait(3000)
      cy.intercept(
        'POST',
        `${Cypress.env('urlApi')}/api/financeintegration/titleparcel/new-search`,
      ).as('loadSearch')
      cy.get(el.inputSearchReceive).type(searchTitle)
      cy.wait('@loadSearch')
      cy.get(el.daysExperation)
        .invoke('text')
        .then((value) => {
          expect(justNumbers(value)).be.equal(CalcDiference(dateExperation, dateToday))
        })
    }
  }
}

export default new Receivable()
