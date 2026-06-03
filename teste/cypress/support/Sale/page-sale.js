const el = require("./elements").elements;
import {faker} from "@faker-js/faker";
import justNumbers from "../Utils/utils";

class Sale {
  MakeSaleWithEmployee(havePersonAuthorized = false) {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/consignment/order/pending-consignment-by-target-person/**`
    ).as("loadConsigment");
    if (havePersonAuthorized) {
      cy.fillMbgSelect(el.inputClient, Cypress.env("clientPersonAuthorized"));
    } else {
      cy.fillMbgSelect(el.inputClient, Cypress.env("client"));
    }
    cy.wait("@loadConsigment", {timeout: 50000});
    cy.closeModalIfShows(".mbg-modal", "text: Fechar ");
    cy.wait("@loadCredit", {timeout: 50000});
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/title/debts-by-individual/*`
    ).as("loadReceive");
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    cy.wait("@loadReceive", {timeout: 50000});
    cy.closeModalIfShows(".total-credit", ".btn > .fas");
    cy.closeModalIfShows('.mbg-title:contains("Títulos")', "text: Fechar ");
    if (havePersonAuthorized) {
      cy.get(el.checkboxPersonAuthorized).first().click();
      cy.get(el.spanPersonAuthorized).should("be.visible");
    }
    cy.get(el.btnInputEmployee).click();
    cy.get(el.inputEmployee).type(Cypress.env("employ") + "{enter}", {
      delay: 0
    });
  }
  MakeSaleClientOutOfState() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/consignment/order/pending-consignment-by-target-person/**`
    ).as("loadConsigment");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/title/debts-by-individual/*`
    ).as("loadReceive");
    cy.fillMbgSelect(el.inputClient, Cypress.env("clientOutOfState"));
    cy.wait("@loadConsigment", {timeout: 50000});
    cy.closeModalIfShows(".mbg-modal", "text: Fechar ");
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    cy.wait("@loadReceive", {timeout: 50000});
    cy.closeModalIfShows(".total-credit", ".btn > .fas");
    cy.closeModalIfShows('.mbg-title:contains("Títulos")', "text: Fechar ");
    cy.get(el.btnInputEmployee).click();
    cy.get(el.inputEmployee).type(Cypress.env("employ") + "{enter}", {
      delay: 0
    });
  }
  MakeSaleWithClientLinkEmploy(employInactive = false) {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/consignment/order/pending-consignment-by-target-person/**`
    ).as("loadConsigment");
    if (employInactive) {
      cy.fillMbgSelect(el.inputClient, Cypress.env("clientLinkEmployInactive"));
    } else {
      cy.fillMbgSelect(el.inputClient, Cypress.env("clientLinkEmploy"));
    }
    cy.wait("@loadConsigment", {timeout: 50000});
    cy.closeModalIfShows(".mbg-modal", ".btn > .fas");
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    if (employInactive) {
      cy.get(el.valueEmploy).should("be.hidden");
    } else {
      cy.get(el.valueEmploy).should("not.be.hidden");
    }
  }
  MakeSaleCreatingClient() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.get(el.inputClient).type(`${faker.person.fullName()}`, {
      delay: 500
    });
    cy.get(".new-item").should("be.visible").click();
    cy.get(el.inputCodAdress).type("87200234");
    cy.wait(3000);
    cy.get(el.inputNumberAdress).type(faker.number.int());
    cy.get(el.btnRegisterClient).click();
    cy.get("body").then(($body) => {
      cy.log($body.find(".sweet-alert").length);
      if ($body.find(".sweet-alert").length > 0) {
        cy.wait(3000);
        cy.contains("button", "Não informar").click();
      }
    });
    cy.wait(3000);
    cy.get(el.btnInputEmployee).click();
    cy.get(el.inputEmployee).type(Cypress.env("employ") + "{enter}", {
      delay: 0
    });
  }
  MakeSaleCreatingClientRegisterComplete() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.get(el.inputClient).type(`${faker.person.fullName()}`, {
      delay: 500
    });
    cy.get(".new-item").should("be.visible").click();

    cy.contains("a", "Cadastro Completo").click();
    cy.get(el.inputCodAdress).type("87200234");
    cy.wait(3000);
    cy.get(el.inputNumberAdress).type(faker.number.int());
    cy.intercept("POST", `${Cypress.env("urlApi")}/api/individual`).as(
      "registerClient"
    );
    cy.contains("button", " Cadastrar ").click();
    cy.wait("@registerClient");
    cy.wait(2000);
    cy.get(el.btnInputEmployee).click();
    cy.get(el.inputEmployee).type(Cypress.env("employ") + "{enter}", {
      delay: 0
    });
  }
  MakeSaleForFinalConsumer() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.btnInputEmployee).should("be.visible").click();
    cy.get(el.inputEmployee).type(Cypress.env("employ") + "{enter}", {
      delay: 0
    });
  }
  AddProductBarcode(codbarras = [], delay = 100) {
    codbarras.forEach((cod) => {
      cy.intercept(
        "GET",
        `${Cypress.env("urlApi")}/api/stockitem/searchbyproductparam*`
      ).as("searchProductBarcode");
      if (Cypress.env("principalBranch").trim() === "Teste Rai") {
        cy.get(el.inputProduct)
          .eq(1)
          .clear()
          .type(cod + "{enter}", {delay: delay});
      } else {
        cy.get(el.inputProduct)
          .eq(0)
          .clear()
          .type(cod + "{enter}", {delay: delay});
      }
      cy.wait("@searchProductBarcode", {timeout: 30000});
    });
  }
  AddproductConsult(codbarras = []) {
    codbarras.forEach((cod) => {
      cy.get(el.btnConsultProduct).click();
      cy.get(el.inputConsultProduct).type(cod);
      cy.wait(2000);
      cy.get(el.checkboxSelectProduct).first().click();
      cy.contains("button", " Concluir ").click();
      cy.wait(3000);
    });
  }
  GetValueTotalSaleInProduct() {
    cy.get(el.valueTotalSaleInProduct)
      .invoke("text")
      .then((value) => {
        Cypress.env("valueCurrent", justNumbers(value));
        cy.log(Cypress.env("valueCurrent"));
      });
  }
  ApplyDiscountInProduct(percentage = 5000, haveLimit = false) {
    cy.get(el.valueProductBeforeDiscount)
      .first()
      .invoke("text")
      .then((valueProduct) => {
        Cypress.env("valueProductBeforeDiscont", justNumbers(valueProduct));
        cy.get(el.btnOptionProduct).first().click();
        cy.get(el.btnOptionDiscountInProduct).first().click();
        cy.get(el.inputPercentageDiscountInProduct).type(percentage);
        if (haveLimit) {
          cy.get(el.haveLimit)
            .invoke("text")
            .then((limit) => {
              Cypress.env("limit", justNumbers(limit));
              cy.log(Cypress.env("limit"));
              if (
                Cypress.env("limit") < percentage / 100 &&
                Cypress.env("limit") != 0
              ) {
                cy.contains("button", " Adicionar mesmo assim ").should(
                  "be.visible"
                );
              }
              cy.get(el.btnContinueApplyDiscount).click();
              Cypress.env(
                "valueDiscount",
                Cypress.env("valueProductBeforeDiscont") *
                  (percentage / 100 / 100)
              );
              cy.get(el.valueTotalSaleInProduct)
                .invoke("text")
                .then((valueTotal) => {
                  expect(justNumbers(valueTotal)).be.eq(
                    Cypress.env("valueCurrent") - Cypress.env("valueDiscount")
                  );
                });
            });
        } else {
          cy.get(el.btnContinueApplyDiscount).click();
          cy.wait(3000);
          Cypress.env(
            "valueDiscount",
            Cypress.env("valueProductBeforeDiscont") * (percentage / 100 / 100)
          );
          cy.get(el.valueTotalSaleInProduct)
            .invoke("text")
            .then((valueTotal) => {
              cy.log(Cypress.env("valueCurrent"));
              cy.log(Cypress.env("valueDiscount"));
              cy.log(
                Cypress.env("valueCurrent") - Cypress.env("valueDiscount")
              );
              cy.log(valueTotal);
              expect(justNumbers(valueTotal)).be.eq(
                Cypress.env("valueCurrent") - Cypress.env("valueDiscount")
              );
            });
        }
      });
  }
  ContinueToBilling() {
    cy.get(el.btnConfirmSale).click();
    cy.get(".payment-type-wrapper", {timeout: 30000}).should("be.visible");
  }
  ValidateEmploy() {
    cy.contains("label", `Vendedor: ${Cypress.env("employ")} `).should(
      "be.visible"
    );
  }
  SaveSale() {
    cy.get(el.btnSaveSale).click();
    cy.get(el.btnHistoric).click();
    cy.wait(2000);
  }
  EditSale() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnEditSale).click();
  }

  CancelSale(motive) {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnCancelSale).click();
    if (motive != undefined) {
      cy.get(el.inputMotiveCancellation).type(motive);
    }
    cy.wait(2000);
    cy.intercept("GET", `${Cypress.env("urlApi")}/api/sale/cancel/*`).as(
      "cancelSale"
    );
    cy.get(".confirm").click();
    cy.wait("@cancelSale").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  }
  ValidatePersonAuthorized() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/title/debts-by-individual/*`
    ).as("loadReceive");
    cy.fillMbgSelect(el.inputClient, Cypress.env("clientPersonAuthorized"));
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    cy.wait("@loadReceive", {timeout: 50000});
    cy.closeModalIfShows(".total-credit", ".btn > .fas");
    cy.closeModalIfShows('.mbg-title:contains("Títulos")', "text: Fechar ");
    cy.get(el.checkboxPersonAuthorized).first().click();
    cy.get(el.spanPersonAuthorized).should("be.visible");
    cy.get(el.eraseNameClient).click();
    cy.fillMbgSelect(el.inputClient, Cypress.env("client"));
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    cy.wait("@loadReceive", {timeout: 50000});
    cy.closeModalIfShows(".total-credit", ".btn > .fas");
    cy.closeModalIfShows('.mbg-title:contains("Títulos")', "text: Fechar ");
    cy.get(el.spanPersonAuthorized).should("not.be.visible");
  }

  MakeSaleWitouthEmployee(havePersonAuthorized = false) {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.eraseNameClient).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/discount-coupon/get-credit-coupon-customer/*`
    ).as("loadCredit");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/consignment/order/pending-consignment-by-target-person/**`
    ).as("loadConsigment");
    if (havePersonAuthorized) {
      cy.fillMbgSelect(el.inputClient, Cypress.env("clientPersonAuthorized"));
    } else {
      cy.fillMbgSelect(el.inputClient, Cypress.env("client"));
    }

    cy.wait("@loadConsigment", {timeout: 50000});
    cy.closeModalIfShows(".mbg-modal", ".btn > .fas");
    cy.wait("@loadCredit", {timeout: 50000});
    cy.closeModalIfShows(".mbg-confirm-alert-wrapper", "text: Fechar ");
    if (havePersonAuthorized) {
      cy.get(el.checkboxPersonAuthorized).first().click();
      cy.get(el.spanPersonAuthorized).should("be.visible");
    }
  }

  ChargebackByHistoric() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.btnHistoric).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnChargeback).click();
    cy.contains("button", "Estornar Venda").click();
  }
  ChargebackBySaleHistoric() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnChargeback).click();
    cy.contains("button", "Estornar Venda").click();
  }
  ChagebackAndInvoiceByHistoric() {
    cy.get(el.tabSale).click({force: true});
    cy.get(el.btnHistoric).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnChargeback).click();
    cy.contains("button", "Estornar Venda e Nota").click();
    cy.wait(8000);
  }
  ChagebackAndInvoiceBySaleHistoric() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnChargeback).click();
    cy.contains("button", "Estornar Venda e Nota").click();
    cy.wait(8000);
  }

  GenerateNewSaleHitoric() {
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnGenerateNewSale).click();
    cy.wait(2000);
    cy.contains("button", "Sim").click();
    cy.wait(2000);
  }
  GenerateNewSaleBySaleHitoric() {
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnGenerateNewSale).click();
    cy.wait(2000);
    cy.contains("button", "Sim").click();
    cy.wait(2000);
  }

  PrintSale() {
    cy.get(el.tabSaleHistory).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/genericreport/getdefault/PRINTSALE`
    ).as("printSale");
    cy.get(el.btnPrintSale).click();
    cy.wait("@printSale").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".report-iframe", {timeout: 30000}).should("be.visible");
  }
  PrintCarnet() {
    cy.get(el.tabSaleHistory).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/genericreport/getdefault/PRINTSALE`
    ).as("printSale");
    cy.get(el.btnInvoice).click();
    cy.get(el.btnPrintCarnet).click();
    cy.wait("@printSale").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(".report-iframe", {timeout: 30000}).should("be.visible");
  }

  //Pate de faturamento
  //faturamento dinheiro
  PaymentMoneyTotal() {
    cy.contains(".payment-type-item", "Dinheiro").should("be.visible").click();
    cy.get(el.btnAddPaymentMoney).click();
    cy.get(el.btnAddPaymentMoney).should("not.exist");
  }
  PaymentMoneyPartial(vlr) {
    cy.contains(".payment-type-item", "Dinheiro").should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.btnAddPaymentMoney).click();
    cy.get(el.btnAddPaymentMoney).should("not.exist");
  }
  //faturamento Crédito na loja
  PaymentCoupons() {
    cy.get(el.btnPaymentCoupons).click();
    cy.get('.table.mbg-list-v2 tbody tr').should('be.visible');
    cy.get(el.checkBoxCoupons).eq(0).click();
    cy.get(el.btnAddPaymentCoupons).click();
    cy.get(el.btnAddPaymentCoupons).should("not.exist");
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlr) => {
        var TotalValue = justNumbers($vlr);
        if (TotalValue > 0) {
          this.PaymentCoupons();
        }
      });
  }
  //faturamento depósito
  PaymenteDepositTotal() {
    cy.contains(".payment-type-item", "Depósito").should("be.visible").click();
    cy.get(el.selectAccount).click();
    cy.contains("span", "PIX", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.btnAddPaymentDeposit).click();
    cy.get(el.btnAddPaymentDeposit).should("not.exist");
  }
  PaymenteDepositPartial(vlr) {
    cy.contains(".payment-type-item", "Depósito").should("be.visible").click();
    cy.get(el.selectAccount).click();
    cy.contains("span", "PIX", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.btnAddPaymentDeposit).click();
    cy.get(el.btnAddPaymentDeposit).should("not.exist");
  }
  //faturamento crediario
  PaymentCreditTotal(parcels, dayExpiration) {
    cy.contains(".payment-type-item", "Crediário").should("be.visible").click();
    cy.get('.credit-parcels').should('be.visible');
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.get(el.inputTerm).type("30");
    cy.contains("li", "30", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentCredit).click();
    cy.get(el.btnAddPaymentCredit).should("not.exist");
  }
  PaymentCreditPartial(parcels, dayExpiration, vlr) {
    cy.contains(".payment-type-item", "Crediário").should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.contains("li", "30", { timeout: 10000 }).should("be.visible").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentCredit).click();
    cy.get(el.btnAddPaymentCredit).should("not.exist");
  }
  //faturamento Boleto
  PaymentBoletoTotal(parcels, dayExpiration) {
    cy.contains(".payment-type-item", "Boleto").should("be.visible").click();
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentBoleto).last().click();
    cy.get(el.btnAddPaymentBoleto).should("not.exist");
  }
  PaymentBoletoPartial(parcels, dayExpiration, vlr) {
    cy.contains(".payment-type-item", "Boleto").should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputQuantityParcels).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "30").click();
    cy.get(el.inputExpiration).type(dayExpiration);
    cy.get(el.btnAddPaymentBoleto).last().click();
    cy.get(el.btnAddPaymentBoleto).should("not.exist");
  }
  //Faturamento cheque
  PaymentCheckTotal(parcels, dayExpiration, agency, conta, numeroCheque) {
    cy.contains(".payment-type-item", "Cheque").should("be.visible").click();
    cy.get(el.inputNumberParcelsCheck).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "45").click();
    cy.get(el.selectExpirationCheck).click();
    cy.wait(3000);
    cy.get(el.inputDayExpiration).type(dayExpiration);
    cy.wait(3000);
    cy.contains("li", dayExpiration).last().click();
    cy.get(el.btnContinueCheck).click();
    cy.wait(2000);
    cy.get(el.BankCheck).click();
    cy.contains("li", "654 - Banco A.J.Renner S.A.").click();
    cy.get(el.inputAgencyCheck).type(agency);
    cy.get(el.inputAccountCheck).type(conta);
    cy.get(el.inputNumberCheck).type(numeroCheque);
    cy.get(el.btnConfirmCheck).click();
    cy.get(el.btnAddPaymentCheck).click();
    cy.get(el.btnAddPaymentCheck).should("not.exist");
  }
  PaymentCheckPartial(
    parcels,
    dayExpiration,
    vlr,
    agency,
    conta,
    numeroCheque
  ) {
    cy.contains(".payment-type-item", "Cheque").should("be.visible").click();
    cy.get(el.inputValue).type(vlr);
    cy.get(el.inputNumberParcelsCheck).clear().type(parcels);
    cy.get(el.selectTerm).click();
    cy.wait(3000);
    cy.contains("li", "45").click();
    cy.get(el.selectExpirationCheck).click();
    cy.wait(3000);
    cy.get(el.inputDayExpiration).type(dayExpiration);
    cy.wait(3000);
    cy.contains("li", dayExpiration).last().click();
    cy.get(el.btnContinueCheck).click();
    cy.wait(2000);
    cy.get(el.BankCheck).click();
    cy.contains("li", "654 - Banco A.J.Renner S.A.").click();
    cy.get(el.inputAgencyCheck).type(agency);
    cy.get(el.inputAccountCheck).type(conta);
    cy.get(el.inputNumberCheck).type(numeroCheque);
    cy.get(el.btnConfirmCheck).click();
    cy.get(el.btnAddPaymentCheck).click();
    cy.get(el.btnAddPaymentCheck).should("not.exist");
  }

  //Faturamento cartão de crédito
  PaymentCardCreditPartial(
    vlr,
    parcels,
    flag,
    nsu,
    machineCard = Cypress.env("machineCardName")
  ) {
    cy.contains(".payment-type-item", "Cartão").should("be.visible").click();
    cy.contains("button", /^Crédito(?! na)/).should("be.visible").click();
    cy.get(el.inputValue).clear().type(vlr);
    cy.get(el.inputNumberParcelsCard).type(parcels);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      case "elo":
        cy.get(
          '[src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
    }
    cy.get(el.btnAddPaymentCard).should("not.exist");
  }
  PaymentCardCreditTotal(
    parcels,
    flag,
    nsu,
    machineCard = Cypress.env("machineCardName")
  ) {
    cy.contains(".payment-type-item", "Cartão").should("be.visible").click();
    cy.contains("button", /^Crédito(?! na)/).should("be.visible").click();
    cy.get(el.inputNumberParcelsCard).type(parcels);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
    cy.get(el.btnAddPaymentCard).should("not.exist");
  }
  //Faturamento cartão de débito
  PaymentCardDebitPartial(
    vlr,
    flag,
    nsu,
    machineCard = Cypress.env("machineCardName")
  ) {
    cy.contains(".payment-type-item", "Cartão").should("be.visible").click();
    cy.contains("button", "Débito ").click();
    cy.get(el.inputValue).clear().type(vlr);
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      case "elo":
        cy.log("elo");
        cy.get(
          '[src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
        cy.wait(2000);
    }
    cy.get(el.btnAddPaymentCard).should("not.exist");
  }
  PaymentCardDebitTotal(
    flag,
    nsu,
    machineCard = Cypress.env("machineCardName")
  ) {
    cy.contains(".payment-type-item", "Cartão").should("be.visible").click();
    cy.contains("button", "Débito ").click();
    cy.contains("button", " Continuar ").click();
    cy.get(el.btnMoreFlags).click();
    switch (flag) {
      case "master":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FMastercard.png?alt=media&token=c32da8ce-bb8f-47ed-87e2-cd7e702fdbb4"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "visa":
        cy.get(
          '[ng-src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FVisa.png?alt=media&token=b5223ce3-b398-4cf7-9dba-e5b26c9dae1b"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      case "elo":
        cy.get(
          '[src="https://firebasestorage.googleapis.com/v0/b/mobiage-ac405.appspot.com/o/banderias%2FElo.png?alt=media&token=7a6dd949-15e8-443f-a92a-4f0f8240188f"]'
        ).click();
        cy.contains("span", machineCard).click();
        cy.get(el.inputNSU).type(nsu);
        cy.get(el.btnAddPaymentCard).click();
        break;
      default:
        cy.get(el.btnAddPaymentCard).click();
    }
    cy.get(el.btnAddPaymentCard).should("not.exist");
  }

  FinishPayment() {
    cy.get(el.bntBill).click();
    cy.get(el.bntClosedInvoice).click();
  }
  FinishPaymentPrintPresent() {
    cy.get(el.checkboxPrintPresent).click();
    cy.get(el.bntBill).click();
    cy.get(el.bntClosedInvoice).click();
    cy.get(el.checkboxProductPrintPresent).click();
    cy.contains("button", " Imprimir ").click();
    cy.contains("button", " Não enviar ").click();
    cy.wait(2000);
  }

  //Parte de desconto

  ApplyDiscount(discount) {
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($desc) => {
        Cypress.env("ValueWithoutDiscount", justNumbers($desc));
      });
    cy.get(el.btnDiscount).click();
    cy.get(el.inputDiscount).clear().type(discount);
    cy.wait(3000);
    cy.intercept(`${Cypress.env("urlApi")}/api/discount/find`).as(
      "loadDiscount"
    );
    cy.get(el.btnConfirmDiscount).click();
    cy.wait("@loadDiscount");
    cy.wait(3000);
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($desc) => {
        expect(justNumbers($desc)).to.eq(
          Cypress.env("ValueWithoutDiscount") - discount
        );
      });
  }

  //Parte da taxa de entrega
  Applyfreight(freight) {
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        Cypress.env("valorsemTaxa", justNumbers($vlrRaxa));
      });
    cy.get(el.btnFreight).click();
    cy.get(el.inputFreight).clear().type(freight);
    cy.get(el.btnSaveFreight).click();
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        expect(justNumbers($vlrRaxa)).to.eq(
          Cypress.env("valorsemTaxa") + freight
        );
      });
  }
  //Parte da taxa de entrega
  ApplyAddiction(addiction) {
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        Cypress.env("valorsemTaxa", justNumbers($vlrRaxa));
      });
    cy.get(el.btnAddiction).click();
    cy.get(el.inputAddiction).clear().type(addiction);
    cy.get(el.btnConfirmAddiction).click();
    cy.get(el.TotalValue)
      .invoke("text")
      .then(($vlrRaxa) => {
        expect(justNumbers($vlrRaxa)).to.eq(
          Cypress.env("valorsemTaxa") + addiction
        );
      });
  }
  FinishPaymentValidatingFreight(freight) {
    cy.get(el.bntBill).click();
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
    cy.get(el.bntBill).click();
    cy.wait(8000);
    cy.get(el.btnAdvancedOptions).click();
    cy.wait(3000);
    cy.contains("span", "02. Informações sobre o transporte").click();
    cy.get(el.vlrFreight).should(
      "have.value",
      "R$ " + (freight / 100).toFixed(2).replace(".", ",")
    );
    cy.get(el.btnBackInvoice).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.get(el.btnSendNfe).click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }

  //parte de notas
  FinishpaymentSendNFE() {
    cy.get(el.bntBill).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.get(el.btnSendNfe).click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  FinishPaymentSendNFCE() {
    cy.get(el.bntBill).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfce");
    cy.get(el.btnSendNfce).click();
    cy.wait("@nfce").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  SendNFCeBySaleHistoric() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnInvoice).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfce");
    cy.get(el.btnSendNfce).click();
    cy.wait("@nfce").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  SendNFeBySaleHistoric() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnInvoice).click();
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/nfe/enviar`).as("nfe");
    cy.get(el.btnSendNfe).click();
    cy.wait("@nfe").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.printInvoice).should("be.visible");
  }
  GeneratedConsignmentBySale() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnGenerateConsignment).click();
    cy.contains("button", " Sim ").click();
    cy.contains("div", " Venda transferida para o consignado! ").should(
      "be.visible"
    );
  }
  InformPaymentLater() {
    cy.get(el.btnPaymentLater).click();
    cy.intercept(
      "PUT",
      `${Cypress.env("urlApi")}/api/sale/do-movement-v2/*`
    ).as("paylater");
    cy.contains("button", " Estou ciente ").click();
    cy.wait("@paylater").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get(el.bntClosedInvoice).click();
  }
  GenerateSingleNoteBySale() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/price-sheet-type/gquery`
    ).as("singlenote");
    cy.get(el.btnGenerateSingleNote).click();
    cy.wait("@singlenote").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  }
  PrintPresent(print = true) {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnOptionPrintPresent).click();
    cy.wait(3000);
    cy.get(el.checkboxProductPrintPresent).click();
    if (!print) {
      cy.wait(3000);
    } else {
      cy.intercept(
        "POST",
        `${Cypress.env("urlApi")}/api/gift-voucher-product-tag/sale`
      ).as("laodPrintCoupon");
      cy.contains("button", " Imprimir ").click();
      cy.contains("button", " Não enviar ").click();
      cy.wait("@laodPrintCoupon", {timeout: 50000});
    }
  }
  BillSale() {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnBillSaleHistoric).click();
    cy.wait(6000);
  }
  FinishPaymentByBill() {
    cy.get(el.bntBill).click();
    cy.wait(3000);
  }
  ChangeInformationsByHistoric(
    changeEmploy = false,
    employ = Cypress.env("employ")
  ) {
    cy.get(el.tabSaleHistory).click();
    cy.get(el.btnOptionHistoric).click();
    cy.get(el.btnOptionAlterInformations).click();
    if (changeEmploy) {
      cy.wait(4000);
      cy.get("body").then(($body) => {
        cy.log($body.find(el.eraseEmploy).length);
        if ($body.find(el.eraseEmploy).length > 0) {
          cy.get(el.eraseEmploy).click();
        } else {
          cy.get(el.btnInputEmployee).click();
        }
      });

      cy.get(el.inputEmployee).type(employ + "{enter}", {delay: 300});
    }
    cy.intercept("PUT", `${Cypress.env("urlApi")}/api/movementgroup/**`).as(
      "change"
    );
    cy.get(el.btnSaveChangeInformation).click();
    cy.wait("@change").then((intercept) => {
      expect(intercept.response.statusCode).be.equal(204);
    });
  }
}

export default new Sale();
