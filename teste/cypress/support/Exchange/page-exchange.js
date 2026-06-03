const el = require("./elements").elements;
import justNumbers from "../Utils/utils";
import {getLastSegment} from "../Utils/utils";

class Exchange {
  StartExchange() {
    cy.get(el.tabExchange).click();
    cy.contains("button", " Cliente ").click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/consignment/order/pending-consignment-by-target-person/**`
    ).as("loadConsigment");
    cy.get(el.btnInputClient).click();
    cy.get(el.inputClient).type(Cypress.env("client") + "{enter}", {delay: 0});
    cy.wait("@loadConsigment", {timeout: 50000});
    cy.closeModalIfShows(".mbg-modal", "text: Fechar ");
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    cy.contains("button", " Continuar troca ").click();
  }
  MakeExchangeReferenceSaleAll() {
    cy.get(el.btnSelectExchange).first().click();
    cy.contains("span", " Conferir ").click();
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadPageSaleExchange"
    );
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("loadPriceSheetExchange");
    cy.contains("button", " Continuar ").should("be.visible").click();
    cy.wait("@loadPageSaleExchange", {timeout: 50000});
    cy.url().should("include", "/commercial/exchange-choose-items/");
    cy.wait("@loadPriceSheetExchange", {timeout: 50000});
  }
  MakeExchangeReferenceSale(pos = 0) {
    cy.get(el.btnSelectExchange).first().click();
    cy.contains("span", " Conferir ").click();
    cy.contains("button", " Trocar").should("be.visible").click({multiple: true});
    cy.contains("button", " Trocar").eq(pos).click();
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadPageSaleExchange"
    );
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("loadPriceSheetExchange");
    cy.contains("button", " Continuar ").click();
    cy.wait("@loadPageSaleExchange", {timeout: 50000});
    cy.url().should("include", "/commercial/exchange-choose-items/");
    cy.wait("@loadPriceSheetExchange", {timeout: 50000});
  }
  AddProductBarcode(barcode = []) {
    barcode.forEach((cod) => {
      cy.intercept(
        "GET",
        `${Cypress.env("urlApi")}/api/stockitem/searchbyproductparam*`
      ).as("searchProductBarcodeExchange");
      if (Cypress.env("principalBranch").trim() === "Teste Rai") {
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + "{enter}");
      } else {
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + "{enter}");
      }
      cy.wait("@searchProductBarcodeExchange", {timeout: 30000});
    });
  }
  StartExchangeByCardPresent(saleID, cardPresent) {
    if (cardPresent == undefined) {
      const token = localStorage.getItem("token");
      cy.wait(2000);
      cy.request({
        method: "POST",
        url: `${Cypress.env("urlApi")}/api/gift-voucher-product-tag/sale`,
        headers: {
          accept: "application/json, text/plain, */*",
          Gumgatoken: token
        },
        body: {
          saleId: saleID,
          productItens: [
            {
              productItemId: "3EE7FEF9618D151A43830675F883E4B7",
              movementStockId: 977560325,
              amount: 1
            }
          ]
        }
      });
      cy.log(token);
      cy.request({
        method: "GET",
        url: `${Cypress.env(
          "urlApi"
        )}/api/gift-voucher-product-tag/movement-group/${saleID}`,
        headers: {
          Gumgatoken: token
        }
      }).then((resp) => {
        const data = resp.body;
        cardPresent = data[data.length - 1].barCode;
        cy.visit(Cypress.env("urlApp"));
        cy.get(el.tabExchange).click({force: true});
        cy.get(el.inputExchangeCardPresent).type(cardPresent + "{enter}");
      });
    } else {
      cy.visit(Cypress.env("urlApp"));
      cy.get(el.tabExchange).click();
      cy.get(el.inputExchangeCardPresent).type(cardPresent + "{enter}");
    }
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("loadPriceSheetCardPresent");
    cy.contains("button", " Continuar troca ").click();
    cy.wait("@loadPriceSheetCardPresent", {timeout: 50000});
  }
  AddProductConsult(barcode = []) {
    barcode.forEach((cod) => {
      cy.get(el.btnConsultProduct).click();
      cy.get(el.inputConsultProduct).type(cod);
      cy.wait(2000);
      cy.get(el.checkboxSelectProduct).first().click();
      cy.contains("button", " Concluir ").click();
      cy.wait(3000);
    });
  }
  ContinueExchange() {
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadCheck"
    );
    cy.contains("button", " Continuar ").should("not.be.disabled").click();
    cy.wait("@loadCheck", {timeout: 50000});
    cy.url().should("include", "/commercial/exchange-confirmation");
  }
  ContinueExchangeDevolution() {
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/exchange/**`).as(
      "loadDevolution"
    );
    cy.contains("button", " Continuar ").should("not.be.disabled").click();
    cy.wait("@loadDevolution", {timeout: 50000});
    cy.url().should("include", "/commercial/exchange-give-back-money");
  }
  ContinueExchangeChoseProduct() {
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadCheck"
    );
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("loadPriceSheetChose");
    cy.contains("button", " Continuar ").click();
    cy.wait("@loadCheck", {timeout: 50000});
    cy.url().should("include", "/commercial/exchange-choose-items");
    cy.wait("@loadPriceSheetChose", {timeout: 50000});
  }
  ContinueExchangePayment() {
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/payment-point-account/individual/*`
    ).as("loadPagePayment");
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/sale/*`).as("loadCheck");
    cy.contains("button", " Continuar ").click();
    cy.wait(["@loadCheck", "@loadPagePayment"], {timeout: 50000});
    cy.url().should("include", "/commercial/payment");
  }
  FinishExchange() {
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/sale/*`).as(
      "loadInvoice"
    );
    cy.contains("button", " Finalizar ").should("not.be.disabled").click();
    cy.wait("@loadInvoice", {timeout: 95000});
    cy.get(el.bntClosedInvoice).click();
  }
  GeneratesCoupons() {
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/exchange/v2/domovement`
    ).as("loadPageCoupon");
    cy.get(el.btnGeneratesCoupons).click();
    cy.wait("@loadPageCoupon", {timeout: 50000});
    cy.get(el.printCoupons, {timeout: 40000}).should("be.visible");
  }
  ReturnMoney() {
    cy.get(el.btnReturnMoney).click();
    cy.get(el.btnComfirmReturnMoney).click();
    cy.get(el.bntClosedInvoice, { timeout: 15000 }).should("be.visible").click();
  }
  ReceiptNotReportSale() {
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/exchange/new`).as(
      "loadExchange"
    );
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("loadPriceSheet");
    cy.get(el.btnNotReportSale).click();
    cy.wait("@loadExchange", {timeout: 50000});
    cy.url().should("include", "/commercial-base/exchange-choose-items-sale");
    cy.wait("@loadPriceSheet", {timeout: 50000});
  }
  AddProductBarcodeReceipt(barcode = []) {
    barcode.forEach((cod) => {
      cy.intercept(
        "GET",
        `${Cypress.env("urlApi")}/api/stockitem/searchbyproductparam*`
      ).as("searchProductBarcodeReceipt");
      cy.get(el.inputProduct).clear().type(cod + "{enter}");
      cy.wait("@searchProductBarcodeReceipt", {timeout: 30000});
    });
  }
  AddProductConsultReceipt(barcode = []) {
    barcode.forEach((cod) => {
      cy.get(el.btnConsultProduct).click();
      cy.get(el.inputConsultProduct).type(cod);
      cy.wait(2000);
      cy.get(el.checkboxSelectProduct).click();
      cy.contains("button", " Concluir ").click();
      cy.wait(3000);
    });
  }
  AccessHistoric() {
    cy.get(el.tabExchange).click();
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/exchange/historic-list-form?isExchange=true`
    ).as("loadHistoricExchange");
    cy.get(".links-wrapper > a").click();
    cy.wait("@loadHistoricExchange", {timeout: 50000});
    cy.url().should(
      "include",
      "/commercial-base/exchange-history-list/EXCHANGE"
    );
  }
  ChargebackExchange() {
    cy.get(el.btnOptionHistoric).first().click();
    cy.get(el.btnChargeback).click();
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/exchange/historic-list-form?isExchange=true`
    ).as("loadRevert");
    cy.contains("button", "Estornar Troca").click();
    cy.wait("@loadRevert", {timeout: 50000});
  }
  SendInvoice(typeInvoice) {
    //padrão NFE - 1 NFCE - 2 NFe de troca
    cy.get(el.btnOptionHistoric).first().click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/genericreport/getdefault/PRINTEXCHANGE`
    ).as("loadNoteLoad");
    cy.get(el.btnOptionInvoice).click();
    cy.wait("@loadNoteLoad", {timeout: 50000});
    switch (typeInvoice) {
      case 1:
        cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as(
          "nfce"
        );
        cy.get(el.btnSendNfce).click();
        cy.wait("@nfce").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.get(el.printInvoice).should("be.visible");

        break;
      case 2:
        cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as(
          "nfe"
        );
        cy.contains("button", " Emitir troca ").click();
        cy.wait("@nfe").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.get(el.printInvoice).should("be.visible");
        break;
      default:
        cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as(
          "nfe"
        );
        cy.get(el.btnSendNfe).click();
        cy.wait("@nfe").then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
        cy.get(el.printInvoice).should("be.visible");
    }
  }
  GenerateSingleNoteByExchange() {
    cy.get(el.btnOptionHistoric).first().click();
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("singlenote");
    cy.get(el.btnGenerateSingleNote).click();
    cy.wait("@singlenote").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  }
  GenerateNewExchange() {
    cy.get(el.btnOptionHistoric).first().click();
    cy.get(el.btnGenerateNewRequest).click();
    cy.wait(2000);
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadSaleLoad"
    );
    cy.contains("button", "Sim").click();
    cy.wait("@loadSaleLoad", {timeout: 50000});
  }
  SaveExchange() {
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/exchange/historic-list-form?isExchange=true`
    ).as("loadHistoricExchange");
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/exchange/*`).as(
      "saveExchange"
    );
    cy.get(el.btnSaveRequest).click();
    cy.wait(["@saveExchange", "@loadHistoricExchange"], {timeout: 50000}).then(
      (interception) => {
        expect(interception[0].response.statusCode).be.eq(200);
        expect(interception[1].response.statusCode).be.eq(200);
      }
    );
  }

  CancelExchange(motive = "teste cancelamento") {
    cy.get(el.btnOptionHistoric).first().click();
    cy.get(el.btnCancelRequest).click();
    cy.wait(2000);
    cy.get(el.inputMotiveCancellation).type(motive);
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/exchange/*`).as("cancel");
    cy.get(".confirm").click();
    cy.wait("@cancel").then((cancel) => {
      expect(cancel.response.statusCode).be.equal(200);
    });
  }
  ChangeInformationsExchange(
    alterEmploy = false,
    employ,
    alterEmployDevolution = false,
    employDevolution
  ) {
    cy.get(el.btnOptionHistoric).first().click();
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/movementgroup/*`).as(
      "loadModalChangeInformation"
    );
    cy.get(el.btnOptionChangeInformations).click();
    if (alterEmploy) {
      cy.wait("@loadModalChangeInformation", {timeout: 50000});
      cy.get("body").then(($body) => {
        cy.log($body.find('i[class="fa fa-times mbg-icon-select"]').length);
        if ($body.find('i[class="fa fa-times mbg-icon-select"]').length > 1) {
          cy.get(el.eraseEmploy).click();
        } else {
          cy.get(el.btnInputEmployChangeInf).click();
        }
      });

      cy.get(el.inputEmployee).type(employ + "{enter}", {delay: 200});
    }
    if (alterEmployDevolution) {
      cy.wait("@loadModalChangeInformation", {timeout: 50000});
      cy.get("body").then(($body) => {
        cy.log($body.find(el.btnInputEmployeDevolution).length);
        if ($body.find(el.btnInputEmployeDevolution).length > 0) {
          cy.get(el.btnInputEmployeDevolution).click();
        } else {
          cy.get(el.eraseEmployDevolution).click();
        }
      });
      cy.get(el.inputEmployee).type(employDevolution + "{enter}", {delay: 200});
      cy.wait(300);
    }
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/movementgroup/**`).as(
      "change"
    );
    cy.get(el.btnSaveChangeInformation).click();
    cy.wait("@change").then((intercept) => {
      expect(intercept.response.statusCode).be.equal(204);
    });
  }
  //Pate de faturamento
  //faturamento dinheiro
  PaymentMoneyTotal() {
    cy.get(el.btnPaymentMoney).click();
    cy.get(el.btnAddPaymentMoney).click();
  }
  PaymentMoneyPartial(vlr) {
    cy.get(el.btnPaymentMoney).click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.btnAddPaymentMoney).click();
  }
  //faturamento depósito
  PaymenteDepositTotal() {
    cy.get(el.btnPaymentDeposit).click();
    cy.get(el.selectAccount).click();
    cy.contains("span", "PIX", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.btnAddPaymentDeposit).click();
  }
  PaymenteDepositPartial(vlr) {
    cy.get(el.btnPaymentDeposit).click();
    cy.get(el.selectAccount).click();
    cy.contains("span", "PIX", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.btnAddPaymentDeposit).click();
  }
  //faturamento crediario
  PaymentCreditTotal(parcels, dayExpiration) {
    cy.get(el.btnPaymentCredit).click();
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentCredit).click();
  }
  PaymentCreditPartial(parcels, dayExpiration, vlr) {
    cy.get(el.btnPaymentCredit).click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentCredit).click();
  }
  //faturamento Boleto
  PaymentBoletoTotal(parcels, dayExpiration) {
    cy.get(el.btnPaymentBoleto).click();
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentBoleto).last().click();
  }
  PaymentBoletoPartial(parcels, dayExpiration, vlr) {
    cy.get(el.btnPaymentBoleto).click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentBoleto).last().click();
  }
  //Faturamento cheque
  PaymentCheckTotal(parcels, dayExpiration, agencia, conta, numeroCheque) {
    cy.get(el.btnPaymentCheck).click();
    cy.get(el.inputNumberParcelsCheckCard).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(2000);
    cy.contains("li", "45").click();
    cy.get(el.selectExpirationCheck).click();
    cy.wait(2000);
    cy.get(el.inputDayExpiration).type(dayExpiration);
    cy.wait(2000);
    cy.contains("li", dayExpiration).last().click();
    cy.get(el.btnContinueCheck).click();
    cy.wait(2000);
    cy.get(el.BankCheck).click();
    cy.contains("li", "654 - Banco A.J.Renner S.A.").click();
    cy.get(el.inputAgencyCheck).type(agencia);
    cy.get(el.inputAccountCheck).type(conta);
    cy.get(el.inputNumberCheck).type(numeroCheque);
    cy.get(el.btnConfirmCheck).click();
    cy.get(el.btnAddPaymentCheck).click();
  }
  PaymentCheckPartial(
    parcels,
    dayExpiration,
    vlr,
    agencia,
    conta,
    numeroCheque
  ) {
    cy.get(el.btnPaymentCheck).click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputNumberParcelsCheckCard).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(2000);
    cy.contains("li", "45").click();
    cy.get(el.selectExpirationCheck).click();
    cy.wait(2000);
    cy.get(el.inputDayExpiration).type(dayExpiration);
    cy.wait(2000);
    cy.contains("li", dayExpiration).last().click();
    cy.get(el.btnContinueCheck).click();
    cy.wait(2000);
    cy.get(el.BankCheck).click();
    cy.contains("li", "654 - Banco A.J.Renner S.A.").click();
    cy.get(el.inputAgencyCheck).type(agencia);
    cy.get(el.inputAccountCheck).type(conta);
    cy.get(el.inputNumberCheck).type(numeroCheque);
    cy.get(el.btnConfirmCheck).click();
    cy.get(el.btnAddPaymentCheck).click();
  }

  //Faturamento cartão de crédito
  PaymentCardCreditPartial(vlr, parcels, flag, nsu) {
    cy.get(el.btnPaymentCard).click();
    cy.wait(3000);
    cy.contains("button", "Crédito ").click();
    cy.get(el.inputValue).clear().type(vlr);
    cy.get(el.inputNumberParcelsCheckCard).type(parcels);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
  }
  PaymentCardCreditTotal(parcels, flag, nsu) {
    cy.get(el.btnPaymentCard).click();
    cy.wait(3000);
    cy.contains("button", "Crédito ").click();
    cy.get(el.inputNumberParcelsCheckCard).type(parcels);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
  }
  //Faturamento cartão de débito
  PaymentCardDebitPartial(vlr, flag, nsu) {
    cy.get(el.btnPaymentCard).click();
    cy.wait(3000);
    cy.contains("button", "Débito ").click();
    cy.get(el.inputValue).clear().type(vlr);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
  }
  PaymentCardDebitTotal(flag, nsu) {
    cy.get(el.btnPaymentCard).click();
    cy.wait(3000);
    cy.contains("button", "Débito ").click();
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
  }

  FinishPayment() {
    cy.get(el.btnBill).click();
    cy.get(el.bntClosedInvoice).click();
  }

  //Parte de desconto

  ApplyDiscount(discount) {
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($desc) => {
        Cypress.env("valueWithoutDiscount", justNumbers($desc));
      });
    cy.get(el.btnDiscount).click();
    cy.get(el.inputDiscount).clear().type(discount);
    cy.get(el.btnConfirmDiscount).click();
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($desc) => {
        expect(justNumbers($desc)).to.eq(
          Cypress.env("valueWithoutDiscount") - discount
        );
      });
  }

  //Parte da taxa de entrega
  ApplyFreight(freight) {
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        Cypress.env("valueWithoutFreight", justNumbers($vlrRaxa));
      });
    cy.get(el.btnFreight).click();
    cy.get(el.inputFreight).clear().type(freight);
    cy.get(el.btnSaveFreight).click();

    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        expect(justNumbers($vlrRaxa)).to.eq(
          Cypress.env("valueWithoutFreight") + freight
        );
      });
  }
  FinishPaymentValidatingFreight(freight) {
    cy.get(el.btnBill).click();
    cy.wait(8000);
    cy.get(el.btnAdvancedOptions).click();
    cy.wait(3000);
    cy.contains("span", "02. Informações sobre o transporte").click();
    cy.get(el.vlrFreight).should(
      "have.value",
      "R$ " + (freight / 100).toFixed(2).replace(".", ",")
    );
  }
  FinishPaymentValidatingFreightSendNFE(freight) {
    cy.get(el.btnBill).click();
    cy.wait(8000);
    cy.get(el.btnAdvancedOptions).click();
    cy.wait(3000);
    cy.contains("span", "02. Informações sobre o transporte").click();
    cy.get(el.vlrFreight).should(
      "have.value",
      "R$ " + (freight / 100).toFixed(2).replace(".", ",")
    );
    cy.get(el.btnReturn).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.get(el.btnSendNfe).click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }

  //parte de notas
  FinishpaymentSendNFE() {
    cy.get(el.btnBill).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.get(el.btnSendNfe).click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  FinishPaymentSendNFCE() {
    cy.get(el.btnBill).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfce");
    cy.get(el.btnSendNfce).click();
    cy.wait("@nfce").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  FinishPaymentSendNFEExchange() {
    cy.get(el.btnBill).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.contains("button", " Emitir troca ").click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
}

export default new Exchange();
