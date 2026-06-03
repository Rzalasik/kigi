const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Consignment {
  MakeOrderConsignment(haveEmployee = true) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabConsignment).click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCredit')
    cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}', { delay: 0 })
    cy.wait('@loadCredit', { timeout: 50000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
    ).as('loadReceive')
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })

    cy.wait('@loadReceive', { timeout: 50000 })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.btnNewOrder).click()
    if (haveEmployee) {
      cy.get(el.btnInputEmployee).click()
      cy.get(el.inputEmployee).type(Cypress.env('employ') + '{enter}', { delay: 0 })
    }
    /*cy.wait(7000)
        cy.contains('span', 'Eduardo Tampelini').click()  */
  }
  ContinueOrderConsignment(haveEmployee = true) {
    cy.get(el.btnNewOrder).click()
    if (haveEmployee) {
      cy.get(el.btnInputEmployee).click()
      cy.get(el.inputEmployee).type(Cypress.env('employ') + '{enter}', { delay: 0 })
    }
    /*cy.wait(7000)
        cy.contains('span', 'Eduardo Tampelini').click()  */
  }
  AddProductBarcode(barcode = []) {
    barcode.forEach((cod) => {
      if (Cypress.env('principalBranch').trim() === 'Teste Rai') {
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + '{enter}')
        cy.wait(2000)
      } else {
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + '{enter}')
        cy.wait(2000)
      }
    })
  }
  AddProductConsult(barcode = [], choiceEspecific = false) {
    barcode.forEach((cod) => {
      cy.get(el.btnConsultProduct).click()
      cy.get(el.inputConsultProduct).type(cod)
      cy.wait(2000)
      cy.get(el.checkboxSelectProduct).first().click()
      cy.wait(2000)
      cy.contains('button', ' Concluir ').click()
      cy.wait(2000)
    })
  }
  GetValueTotalOrderInProduct() {
    cy.get(el.valueTotalOrderInProduct)
      .invoke('text')
      .then((value) => {
        Cypress.env('valueCurrent', justNumbers(value))
        cy.log(Cypress.env('valueCurrent'))
      })
  }
  ApplyDiscountInProduct(percentage = 5000) {
    cy.get(el.valueProductBeforeDiscount)
      .first()
      .invoke('text')
      .then((valueProduct) => {
        Cypress.env('valueProductBeforeDiscont', justNumbers(valueProduct))
        cy.get(el.btnOptionProduct).first().click()
        cy.get(el.btnOptionDiscountInProduct).first().click()
        cy.get(el.inputPercentageDiscountInProduct).type(percentage)
        cy.get(el.haveLimit)
          .invoke('text')
          .then((limit) => {
            Cypress.env('limit', justNumbers(limit))
            cy.log(Cypress.env('limit'))
            if (Cypress.env('limit') < percentage / 100 && Cypress.env('limit') != 0) {
              cy.contains('button', ' Adicionar mesmo assim ').should('be.visible')
            }
            cy.get(el.btnContinueApplyDiscount).click()
            Cypress.env(
              'valueDiscount',
              Cypress.env('valueProductBeforeDiscont') * (percentage / 100 / 100),
            )
            cy.get(el.valueTotalOrderInProduct)
              .invoke('text')
              .then((valueTotal) => {
                expect(justNumbers(valueTotal)).be.eq(
                  Cypress.env('valueCurrent') - Cypress.env('valueDiscount'),
                )
              })
          })
      })
  }
  ValidateValueDevolution() {
    cy.get(el.valueTotalOrderInProduct)
      .invoke('text')
      .then((value) => {
        expect(justNumbers(value)).not.be.lessThan(0)
      })
  }
  FinishOrderConsignment(sendNFE = false) {
    cy.contains('button', 'Finalizar pedido').click()
    cy.get(el.msgSuccess).should('be.visible')
    if (sendNFE) {
      cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
      cy.get(el.btnSendNfe).click()
      cy.wait('@nfe').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.get(el.printInvoice).should('be.visible')
      cy.contains('button', 'Fechar ').click()
      cy.get(el.bntClosedInvoice).click()
    } else {
      cy.intercept(
        'GET',
        `${Cypress.env('urlApi')}/api/consignment/order/find-by-target-person/*`,
      ).as('loadOrder')
      cy.get(el.bntClosedInvoice).click()
      cy.wait('@loadOrder', { timeout: 40000 })
      cy.wait(2000)
    }
  }
  ContinuePaymentConsignment(howmuchOrdesPay = 1) {
    cy.get(el.btnPayment).click()
    for (var i = 1; i <= howmuchOrdesPay; i++) {
      cy.get(el.checkboxOptionPayment).last().click()
    }
    cy.get(el.btnContinuePayment).click()
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/sale/*`).as('loadSale')
    cy.contains('span', ' Finalizar pedido ').click()
    cy.wait('@loadSale', { timeout: 50000 })
    cy.wait(2000)
  }
  MakePaymentConsignment(howmuchOrdesPay = 1) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabConsignment).click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCredit')
    cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}', { delay: 0 })
    cy.wait('@loadCredit', { timeout: 50000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
    ).as('loadReceive')
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(2000)
    cy.wait('@loadReceive', { timeout: 50000 })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.btnPayment).click()
    for (var i = 1; i <= howmuchOrdesPay; i++) {
      cy.get(el.checkboxOptionPayment).last().click()
    }
    cy.get(el.btnContinuePayment).click()
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/sale/*`).as('loadSale')
    cy.contains('span', ' Finalizar pedido ').click()
    cy.wait('@loadSale', { timeout: 50000 })
    cy.wait(2000)
  }
  GetCountConsignmentPending(inTheScreen = true) {
    if (!inTheScreen) {
      cy.get(el.btnShowItens).click()
      cy.get(el.tabConsignment).click()
      cy.intercept(
        'GET',
        `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
      ).as('loadCredit')
      cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}', { delay: 0 })
      cy.wait('@loadCredit', { timeout: 50000 })
      cy.intercept(
        'GET',
        `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
      ).as('loadReceive')
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
          cy.contains('button', ' Fechar ').click()
        }
      })

      cy.wait('@loadReceive', { timeout: 50000 })
      cy.get('body').then(($body) => {
        if ($body.find('.mbg-modal').length > 0) {
          cy.get('.btn > .fas').click()
        }
      })
    }
    cy.get(el.countConsignmentPending)
      .invoke('text')
      .then(($vlrCount) => {
        Cypress.env('valueConsignmentPending', justNumbers($vlrCount))
        cy.log(Cypress.env('valueConsignmentPending'))
      })
  }
  ValidateCountConsignmentPending() {
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCredit')
    cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}', { delay: 0 })
    cy.wait('@loadCredit', { timeout: 50000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
    ).as('loadReceive')
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait('@loadReceive', { timeout: 50000 })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.countConsignmentPending)
      .invoke('text')
      .then(($vlrCount) => {
        expect(justNumbers($vlrCount)).to.eq(Cypress.env('valueConsignmentPending') - 1)
        cy.log(Cypress.env($vlrCount))
      })
  }
  //parte de estorno e cancelamento
  ChargebackOrderConsignment() {
    cy.get(el.btnOptionsHistoric).click()
    cy.get(el.btnChargeback).click()
    cy.contains('button', 'Estornar Consignado').click()
  }
  GeneratedNewOrder() {
    cy.get(el.btnOptionsHistoric).click()
    cy.get(el.btnGeneratedNewOrder).click()
    cy.wait(2000)
    cy.contains('button', 'Sim').click()
    cy.wait(2000)
  }
  AccessHistoricConsignment() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabConsignment).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/consignment/order/historic-list-form`).as(
      'loadOrderConsigment',
    )
    cy.get('.links-wrapper > a').click()
    cy.wait('@loadOrderConsigment', { timeout: 50000 })
  }
  SaveOrderConsignment() {
    cy.get(el.btnSaveConsignment).click()
  }
  CancelOrderWithoutMotive() {
    cy.get(el.btnOptionsHistoric).click()
    cy.get(el.btnCancelOrder).click()
    cy.wait(2000)
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/cancel/*`).as('cancelamento')
    cy.contains('button', 'Sim').click()
    cy.wait('@cancelamento', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(204)
    })
  }
  CancelOrderWithMotive(motive) {
    cy.get(el.btnOptionsHistoric).click()
    cy.get(el.btnCancelOrder).click()
    cy.wait(2000)
    cy.get(el.inputMotiveCancel).type(motive)
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/cancel/*`).as('cancelamento')
    cy.contains('button', 'Sim').click()
    cy.wait('@cancelamento', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(204)
    })
  }
  ChargebackPaymentConsignment() {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.get(el.btnChargebackPaymentConsignment).click()
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/sale/doreversal/*`).as(
      'loadReversal',
    )
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/consignment/sale/historic-list-form`).as(
      'loadHistoric',
    )
    cy.contains('button', 'Estornar Consignado').click()
    cy.wait(['@loadReversal', '@loadHistoric'], { timeout: 50000 })
  }
  GenerateSingleNote() {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/price-sheet-type/gquery`).as('singlenote')
    cy.get(el.btnGenerateSingleNote).click()
    cy.wait('@singlenote').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  GeneratedNewPayment() {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.get(el.btnGeneratedNewPayment).click()
    cy.wait(2000)
    cy.contains('button', 'Sim').click()
    cy.wait(2000)
  }
  AccessHistoricPayment() {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/consignment/sale/historic-list-form`).as(
      'loadSaleConsigment',
    )
    cy.contains('label', 'Faturamentos').click()
    cy.wait('@loadSaleConsigment', { timeout: 50000 })
  }
  AccessHistoricDevolution() {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/consignment/return/historic-list-form`).as(
      'loadReturnConsigment',
    )
    cy.contains('label', 'Devoluções').click()
    cy.wait('@loadReturnConsigment', { timeout: 50000 })
  }
  ChargebackDevolutionConsignment() {
    cy.get(el.btnOptionsDevolution).click()
    cy.get(el.btnChargebackDevolution).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/consignment/return/historic-list-form`).as(
      'loadReturnConsigmen',
    )
    cy.contains('button', 'Estornar Consignado').click()
    cy.wait('@loadReturnConsigmen', { timeout: 50000 })
  }
  GeneratedNewDevolution() {
    cy.get(el.btnOptionsDevolution).click()
    cy.get(el.btnGeneratedNewDevolution).click()
    cy.wait(2000)
    cy.contains('button', 'Sim').click()
    cy.wait(2000)
  }
  SaveDevolutionConsignment() {
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/dashboard?idClient=*`).as(
      'loadSaveConsigment',
    )
    cy.get(el.btnSaveDevolution).click()
    cy.wait('@loadSaveConsigment', { timeout: 50000 })
  }
  CancelDevolution(motive) {
    cy.get(el.btnOptionsDevolution).click()
    cy.get(el.btnCancelDevolution).click()
    cy.wait(2000)
    if (motive != undefined) {
      cy.get(el.inputMotiveCancel).type(motive)
    }
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/cancel/*`).as('cancelamento')
    cy.contains('button', 'Sim').click()
    cy.wait('@cancelamento', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(204)
    })
  }
  PrintCarnet() {
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/genericreport/getdefault/PRINTSALE`).as(
      'printSale',
    )
    cy.get(el.btnInvoice).click()
    cy.get(el.btnPrintCarnet).click()
    cy.wait('@printSale').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get('.report-iframe').should('be.visible')
  }
  SavePaymentConsignment() {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/movementgroup`).as('saveMovement')
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/person/*`).as('loadPerson')
    cy.get(el.btnSavePayment).click()
    cy.wait(['@saveMovement', '@loadPerson'], { timeout: 50000 })
  }
  CancelPaymentConsignmentWithoutMotive() {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.get(el.btnCancelPayment).click()
    cy.wait(2000)
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/cancel/*`).as('cancelamento')
    cy.contains('button', 'Sim').click()
    cy.wait('@cancelamento', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(204)
    })
  }
  CancelPaymentConsignmentWithMotive(motive) {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.get(el.btnCancelPayment).click()
    cy.wait(2000)
    cy.get(el.inputMotiveCancel).type(motive)
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/consignment/cancel/*`).as('cancelamento')
    cy.contains('button', 'Sim').click()
    cy.wait('@cancelamento', { timeout: 15000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(204)
    })
  }
  ChangeInformationPaymentConsigment(eraseEmploy = false, employ) {
    cy.get(el.btnOpctionsPaymentConsignment).click()
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/movementgroup/*`).as(
      'loadModalChangeInformation',
    )
    cy.get(el.btnOptionChangeInformation).click()
    cy.wait('@loadModalChangeInformation', { timeout: 50000 })
    if (eraseEmploy) {
      cy.get(el.eraseEmploy).click()
    } else {
      cy.get(el.btnInputEmployee).click()
    }
    cy.get(el.inputEmployee).type(employ + '{enter}', { delay: 300 })
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/movementgroup/**`).as('change')
    cy.get(el.btnSaveChangeInformation).click()
    cy.wait('@change').then((intercept) => {
      expect(intercept.response.statusCode).be.equal(204)
    })
  }
  //parte de devolução
  StartDevolutionConsignment(choiceOrder = false) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabConsignment).click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCredit')
    cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}')
    cy.wait(2000)
    cy.wait('@loadCredit', { timeout: 50000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
    ).as('loadReceive')
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait(2000)
    cy.wait('@loadReceive', { timeout: 50000 })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.get(el.btnDevolutionByOrder).click()
    cy.get(el.checkboxChoiceDevolution).last().click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/consignment/order/find-by-target-person/*`,
    ).as('loadOrder')
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnInputEmployee).click()
    cy.get(el.inputEmployee).type(Cypress.env('employ') + '{enter}', { delay: 0 })
    cy.wait('@loadOrder', { timeout: 50000 })
    if (choiceOrder) {
      cy.get(el.btnListOrder).click()
      cy.get(el.checkboxChoiceOrder).first().click()
      cy.contains('button', ' Continuar ').click()
    }
  }
  StartDevolutionConsignmentByClient(choiceOrder = false) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabConsignment).click()
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`,
    ).as('loadCredit')
    cy.get(el.inputClientConsigment).type(Cypress.env('client') + '{enter}')
    cy.wait('@loadCredit', { timeout: 50000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/financeintegration/title/debts-by-individual/*`,
    ).as('loadReceive')
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Fechar ').click()
      }
    })
    cy.wait('@loadReceive', { timeout: 50000 })
    cy.get('body').then(($body) => {
      if ($body.find('.mbg-modal').length > 0) {
        cy.get('.btn > .fas').click()
      }
    })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/consignment/order/find-by-target-person/*`,
    ).as('loadOrder')
    cy.contains('span', 'por cliente').click()
    cy.wait('@loadOrder', { timeout: 50000 })
    cy.get(el.btnInputEmployee).click()
    cy.get(el.inputEmployee).type(Cypress.env('employ') + '{enter}', { delay: 0 })

    if (choiceOrder) {
      cy.get(el.btnListOrder).click()
      cy.get(el.checkboxChoiceDevolution).last().click()
      cy.contains('button', ' Continuar ').click()
    }
  }
  FinishDevolutionConsignment(sendNFE = false) {
    cy.contains('button', ' Devolver ').click()
    if (sendNFE) {
      cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
      cy.get(el.btnSendNfe).click()
      cy.wait('@nfe').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.get(el.printInvoice).should('be.visible')
    } else {
      cy.get(el.bntClosedInvoice).click()
    }
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
    cy.wait(1000)
  }
  //faturamento Crédito na loja
  PaymentCoupons() {
    cy.get(el.btnPaymentCoupons).click()
    cy.wait(2000)
    cy.get(el.checkBoxCoupons).eq(2).click()
    cy.get(el.btnAddPaymentCoupons).click()
    cy.get(el.totalValue)
      .invoke('text')
      .then(($vlr) => {
        var totalValue = justNumbers($vlr)
        if (totalValue > 0) {
          this.PaymentCoupons()
        }
      })
  }
  //faturamento depósito
  PaymenteDepositTotal() {
    cy.contains('.payment-type-item', 'Depósito').should('be.visible').click()
    cy.get(el.selectAccount).click()
    cy.wait(2000)
    cy.contains('span', 'PIX').click()
    cy.get(el.btnAddPaymentDeposit).click()
  }
  PaymenteDepositPartial(vlr) {
    cy.contains('.payment-type-item', 'Depósito').should('be.visible').click()
    cy.get(el.selectAccount).click()
    cy.wait(2000)
    cy.contains('span', 'PIX').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.btnAddPaymentDeposit).click()
    cy.wait(1000)
  }
  //faturamento crediario
  PaymentCreditTotal(parcels, dayExpiration) {
    cy.contains('.payment-type-item', 'Crediário').should('be.visible').click()
    cy.get(el.inputQuantityParcels).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '30').click()
    cy.get(el.inputExpiration).type(dayExpiration)
    cy.get(el.btnAddPaymentCredit).click()
  }
  PaymentCreditPartial(parcels, dayExpiration, vlr) {
    cy.contains('.payment-type-item', 'Crediário').should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.inputQuantityParcels).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '30').click()
    cy.get(el.inputExpiration).type(dayExpiration)
    cy.get(el.btnAddPaymentCredit).click()
    cy.wait(1000)
  }
  FinishPaymentValidatingFreightSendNFE(freight) {
    cy.get(el.bntBill).click()
    cy.wait(6000)
    cy.get(el.btnAdvancedOptions).click()
    cy.wait(2000)
    cy.contains('span', '02. Informações sobre o transporte').click()
    cy.get(el.vlrFreight).should('have.value', 'R$ ' + (freight / 100).toFixed(2).replace('.', ','))
    cy.get(el.btnBackInvoice).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
  }
  //faturamento Boleto
  PaymentBoletoTotal(parcels, dayExpiration) {
    cy.contains('.payment-type-item', 'Boleto').should('be.visible').click()
    cy.get(el.inputQuantityParcels).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '30').click()
    cy.get(el.inputExpiration).type(dayExpiration)
    cy.get(el.btnAddPaymentBoleto).last().click()
  }
  PaymentBoletoPartial(parcels, dayExpiration, vlr) {
    cy.contains('.payment-type-item', 'Boleto').should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.inputQuantityParcels).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '30').click()
    cy.get(el.inputExpiration).type(dayExpiration)
    cy.get(el.btnAddPaymentBoleto).last().click()
    cy.wait(1000)
  }
  //Faturamento cheque
  PaymentCheckTotal(parcels, dayExpiration, agencia, conta, numeroCheque) {
    cy.contains('.payment-type-item', 'Cheque').should('be.visible').click()
    cy.get(el.inputNumberParcelsCheck).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '45').click()
    cy.get(el.selectExpirationCheck).click()
    cy.wait(2000)
    cy.get(el.inputDayExpiration).type(dayExpiration)
    cy.wait(2000)
    cy.contains('li', dayExpiration).last().click()
    cy.get(el.btnContinueCheck).click()
    cy.wait(2000)
    cy.get(el.BankCheck).click()
    cy.contains('li', '654 - Banco A.J.Renner S.A.').click()
    cy.get(el.inputAgencyCheck).type(agencia)
    cy.get(el.inputAccountCheck).type(conta)
    cy.get(el.inputNumberCheck).type(numeroCheque)
    cy.get(el.btnConfirmCheck).click()
    cy.get(el.btnAddPaymentCheck).click()
  }
  PaymentCheckPartial(parcels, dayExpiration, vlr, agencia, conta, numeroCheque) {
    cy.contains('.payment-type-item', 'Cheque').should('be.visible').click()
    cy.get(el.inputValue).type(vlr)
    cy.get(el.inputNumberParcelsCheck).clear().type(parcels)
    cy.get(el.selectTerm).click()
    cy.wait(2000)
    cy.contains('li', '45').click()
    cy.get(el.selectExpirationCheck).click()
    cy.wait(2000)
    cy.get(el.inputDayExpiration).type(dayExpiration)
    cy.wait(2000)
    cy.contains('li', dayExpiration).last().click()
    cy.get(el.btnContinueCheck).click()
    cy.wait(2000)
    cy.get(el.BankCheck).click()
    cy.contains('li', '654 - Banco A.J.Renner S.A.').click()
    cy.get(el.inputAgencyCheck).type(agencia)
    cy.get(el.inputAccountCheck).type(conta)
    cy.get(el.inputNumberCheck).type(numeroCheque)
    cy.get(el.btnConfirmCheck).click()
    cy.get(el.btnAddPaymentCheck).click()
    cy.wait(1000)
  }

  //Faturamento cartão de crédito
  PaymentCardCreditPartial(vlr, parcels, flag, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.wait(2000)
    cy.contains('button', /^Crédito(?! na)/).should('be.visible').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.get(el.inputNumberParcelsCard).type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flag) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
    }
  }
  PaymentCardCreditTotal(parcels, flag, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.wait(2000)
    cy.contains('button', /^Crédito(?! na)/).should('be.visible').click()
    cy.get(el.inputNumberParcelsCard).type(parcels)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flag) {
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
  PaymentCardDebitPartial(vlr, flag, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.wait(2000)
    cy.contains('button', 'Débito ').click()
    cy.get(el.inputValue).clear().type(vlr)
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flag) {
      case 'master':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      case 'visa':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      case 'elo':
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]',
        ).click()
        cy.contains('span', machineCard).click()
        cy.get(el.inputNSU).type(nsu)
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
        break
      default:
        cy.get(el.btnAddPaymentCard).click()
        cy.wait(1000)
    }
  }
  PaymentCardDebitTotal(flag, nsu, machineCard = Cypress.env('machineCardName')) {
    cy.contains('.payment-type-item', 'Cartão').should('be.visible').click()
    cy.wait(2000)
    cy.contains('button', 'Débito ').click()
    cy.contains('button', ' Continuar ').click()
    cy.get(el.btnMoreFlags).click()
    switch (flag) {
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
    cy.get(el.bntClosedInvoice).click()
  }

  //Parte de desconto

  ApplyDiscount(discount) {
    cy.get(el.totalValue)
      .invoke('text')
      .then(($desc) => {
        Cypress.env('valueWithoutDiscount', justNumbers($desc))
      })
    cy.get(el.btnDiscount).click()
    cy.get(el.inputDiscount).clear().type(discount)
    cy.get(el.btnConfirmDiscount).click()
    cy.get(el.totalValue)
      .invoke('text')
      .then(($desc) => {
        expect(justNumbers($desc)).to.eq(Cypress.env('valueWithoutDiscount') - discount)
      })
  }

  //Parte da taxa de entrega
  ApplyFreight(freight) {
    cy.get(el.totalValue)
      .invoke('text')
      .then(($vlrRaxa) => {
        Cypress.env('valueWithoutFreight', justNumbers($vlrRaxa))
      })
    cy.get(el.btnFreight).click()

    cy.get(el.inputFreight).clear().type(freight)

    cy.get(el.btnSaveFreight).click()

    cy.get(el.totalValue)
      .invoke('text')
      .then(($vlrRaxa) => {
        expect(justNumbers($vlrRaxa)).to.eq(Cypress.env('valueWithoutFreight') + freight)
      })
  }
  FinishPaymentValidatingFreight(freight) {
    cy.get(el.bntBill).click()
    cy.get(el.btnAdvancedOptions).click()
    cy.wait(1000)
    cy.contains('span', '02. Informações sobre o transporte').click()
    cy.get(el.vlrFreight).should('have.value', 'R$ ' + (freight / 100).toFixed(2).replace('.', ','))
  }
  //parte de notas

  FinishpaymentSendNFE() {
    cy.get(el.bntBill).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
  }
  FinishPaymentSendNFCE() {
    cy.get(el.bntBill).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfce')
    cy.get(el.btnSendNfce).click()
    cy.wait('@nfce').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.contains('button', 'Fechar ').click()
    cy.wait(1000)
    cy.get(el.bntClosedInvoice).click()
  }
  SendNFeByHistoric() {
    cy.get(el.btnInvoice).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe', { timeout: 50000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.contains('button', 'Fechar ').click()
    cy.wait(1000)
    cy.get(el.bntClosedInvoice).click()
  }
  SendNFeOrderByHistoric() {
    cy.get(el.btnInvoiceOrder).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe', { timeout: 50000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.contains('button', 'Fechar ').click()
    cy.wait(1000)
    cy.get(el.bntClosedInvoice).click()
  }
  SendNFCeByHistoric() {
    cy.get(el.btnInvoice).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfce')
    cy.get(el.btnSendNfce).click()
    cy.wait('@nfce', { timeout: 50000 }).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.contains('button', 'Fechar ').click()
    cy.wait(1000)
    cy.get(el.bntClosedInvoice).click()
  }
}

export default new Consignment()
