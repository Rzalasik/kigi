const el = require("./elements").elements;
import justNumbers from "../Utils/utils";

class Cashier {
  ClosedCashier(haveChange = false, change) {
    cy.get(el.tabCashier).click();
    cy.get(el.btnConfer).should("be.visible").click({multiple: true});
    cy.contains("button", " Fechar caixa ").should("be.visible").click();
    if (haveChange) {
      cy.get(el.checkboxHaveChange).click();
      cy.get(el.inputChange).type(change, {delay: 50});
    }
    cy.contains("button", "Avançar").click();
    cy.intercept(
      "POST",
      `${Cypress.env("urlApi")}/api/financeintegration/cashcheckin/close/*`
    ).as("closeConfirmation");
    cy.contains("button", "sim, fechar caixa").click();
    cy.wait("@closeConfirmation").then((intercept) => {
      expect(intercept.response.statusCode).be.eq(204);
    });
    cy.contains("button", "Não").click();
  }
  OpenCashier(haveChange = false, change) {
    cy.get(el.tabCashier).click();
    cy.get(el.selectCashier).click();
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/financeunitgroup/*/status`
    ).as("loadCashierinformationOpen");
    cy.contains("span", "CAIXA 1", { timeout: 10000 }).should("be.visible").click();
    if (haveChange) {
      cy.wait("@loadCashierinformationOpen");
      cy.get(el.inputChangeOpen).type(change * 100);
      cy.get(el.valueChangeOpen).should(
        "have.value",
        "R$ " + change.toFixed(2).replace(".", ",")
      );
    }
    cy.get(el.valueEmployeOpen).should("not.be.empty");
    cy.get(el.valueDateHourOpen).should("not.be.empty");
    cy.intercept(
      "GET",
      `${Cypress.env("urlApi")}/api/financeintegration/cashcheckin/opencheckin`
    ).as("loadOpenCashier");
    cy.contains("button", " Abrir caixa ").click();
    cy.wait("@loadOpenCashier", {timeout: 30000});
  }
  GetValueCashierMoney() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Dinheiro: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueMoney", justNumbers(value));
        cy.log(Cypress.env("valueMoney"));
      });
  }
  GetValueCashierTreasury() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Tesouraria: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueTreasury", justNumbers(value));
        cy.log(Cypress.env("valueTreasury"));
      });
  }
  GetValueCashierCreditCard() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Cartão de Crédito: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueCreditCard", justNumbers(value));
        cy.log(Cypress.env("valueCreditCard"));
      });
  }
  GetValueCashierDebitCard() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Cartão de Débito: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueDebitCard", justNumbers(value));
        cy.log(Cypress.env("valueDebitCard"));
      });
  }
  GetValueCashierDeposit() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " PIX: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueDeposit", justNumbers(value));
        cy.log(Cypress.env("valueDeposit"));
      });
  }
  GetValueCashierCredit() {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Crediário Loja: ")
      .children()
      .invoke("text")
      .then((value) => {
        Cypress.env("valueCredit", justNumbers(value));
        cy.log(Cypress.env("valueCredit"));
      });
  }
  ValidateValueCashierMoney(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Dinheiro: ")
      .children()
      .invoke("text")
      .then((valueMoney) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueMoney)).to.eq(
              Cypress.env("valueMoney") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueMoney)).to.eq(
              Cypress.env("valueMoney") - value
            );
            break;
          default:
            expect(justNumbers(valueMoney)).to.eq(Cypress.env("valueMoney"));
            break;
        }
      });
  }
  ValidateValueCashierTreasury(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Tesouraria: ")
      .children()
      .invoke("text")
      .then((valueTreasury) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueTreasury)).to.eq(
              Cypress.env("valueTreasury") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueTreasury)).to.eq(
              Cypress.env("valueTreasury") - value
            );
            break;
          default:
            expect(justNumbers(valueTreasury)).to.eq(
              Cypress.env("valueTreasury")
            );
            break;
        }
      });
  }
  ValidateValueCashierCreditCard(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Cartão de Crédito: ")
      .children()
      .invoke("text")
      .then((valueCreditCard) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueCreditCard)).to.eq(
              Cypress.env("valueCreditCard") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueCreditCard)).to.eq(
              Cypress.env("valueCreditCard") - value
            );
            break;
          default:
            expect(justNumbers(valueCreditCard)).to.eq(
              Cypress.env("valueCreditCard")
            );
            break;
        }
      });
  }
  ValidateValueCashierDebitCard(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Cartão de Débito: ")
      .children()
      .invoke("text")
      .then((valueDebitCard) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueDebitCard)).to.eq(
              Cypress.env("valueDebitCard") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueDebitCard)).to.eq(
              Cypress.env("valueDebitCard") - value
            );
            break;
          default:
            expect(justNumbers(valueDebitCard)).to.eq(
              Cypress.env("valueDebitCard")
            );
            break;
        }
      });
  }
  ValidateValueCashierDeposit(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " PIX: ")
      .children()
      .invoke("text")
      .then((valueDeposit) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueDeposit)).to.eq(
              Cypress.env("valueDeposit") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueDeposit)).to.eq(
              Cypress.env("valueDeposit") - value
            );
            break;
          default:
            expect(justNumbers(valueDeposit)).to.eq(
              Cypress.env("valueDeposit")
            );
            break;
        }
      });
  }
  ValidateValueCashierCredit(value, typeValidate) {
    cy.get(el.tabCashier).click();
    cy.contains("label", " Conta Crediário Loja: ")
      .children()
      .invoke("text")
      .then((valueCredit) => {
        switch (typeValidate) {
          case "add":
            expect(justNumbers(valueCredit)).to.eq(
              Cypress.env("valueCredit") + value
            );
            break;
          case "sub":
            expect(justNumbers(valueCredit)).to.eq(
              Cypress.env("valueCredit") - value
            );
            break;
          default:
            expect(justNumbers(valueCredit)).to.eq(Cypress.env("valueCredit"));
            break;
        }
      });
  }
  MovementInput(accountOrigin, value, printReceipt, observation) {
    cy.get(el.btnShowItens).click();
    cy.contains("div", " Movimentação de Caixa ").click();
    cy.get(el.btnSelectOrigin).click();
    switch (accountOrigin) {
      case "pix":
        cy.contains("span", "PIX").click();
        break;
      case "conta corrente":
        cy.contains("span", "Conta Conta Corrente").click();
        break;
      case "tesouraria":
        cy.contains("span", "Conta Tesouraria").click();
        break;
      case "teste ezt":
        cy.contains("span", "teste ezt").click();
        break;
      case "boleto danilo":
        cy.contains("span", "Conta Boleto Danilo").click();
        break;
      default:
        cy.contains("span", "PIX").click();
        break;
    }
    cy.get(el.btnSelectFinancialCategory).click();
    cy.contains("span", "VENDA DE PRODUTOS").click();
    cy.get(el.inputValue).type(value);
    if (observation != undefined) {
      cy.get(el.inputObservation).type(observation);
    }
    cy.get(el.btnConinueMovementCashier).click();
    if (printReceipt == "sim") {
      cy.contains("button", " Sim ").click();
      cy.get(el.receipt).should("be.visible");
      cy.get("body").click();
    } else {
      cy.contains("button", " Não ").click();
    }
  }
  MovementOutput(accountDestiny, value, printReceipt, observation) {
    cy.get(el.btnShowItens).click();
    cy.contains("div", " Movimentação de Caixa ").click();
    cy.contains("button", "Saída").click();
    cy.get(el.btnSelectDestiny).eq(1).click();
    switch (accountDestiny) {
      case "pix":
        cy.contains("span", "PIX").click();
        break;
      case "conta corrente":
        cy.contains("span", "Conta Conta Corrente").click();
        break;
      case "tesouraria":
        cy.contains("span", "Conta Tesouraria").click();
        break;
      case "teste ezt":
        cy.contains("span", "teste ezt").click();
        break;
      case "boleto danilo":
        cy.contains("span", "Conta Boleto Danilo").click();
        break;
      default:
        cy.contains("span", "PIX").click();
        break;
    }
    cy.get(el.btnSelectFinancialCategory).click();
    cy.contains("span", "VENDA DE PRODUTOS").click();
    cy.get(el.inputValue).type(value);
    if (observation != undefined) {
      cy.get(el.inputObservation).type(observation);
    }
    cy.get(el.btnConinueMovementCashier).click();
    if (printReceipt == "sim") {
      cy.contains("button", " Sim ").click();
      cy.get(el.receipt).should("be.visible");
      cy.get("body").click();
    } else {
      cy.contains("button", " Não ").click();
    }
  }
  Transfer(accountOrigin, accountDestiny, value, historic) {
    cy.get(el.btnChangeTab).click();

    cy.get("body").then(($body) => {
      if ($body.find(".mb-smqm-menu").length == 0) {
        cy.get(el.btnChangeTab).click();
      }
    });
    cy.contains("div", "Financeiro").click({force: true});
    cy.get(el.btnShowItensBanking).click();
    cy.get(el.tabTransfer).click();
    cy.get(el.btnSelectOriginTransfer).click();

    switch (accountOrigin) {
      case "pix":
        cy.get(el.inputOriginTransfer).type("PIX{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "conta corrente":
        cy.get(el.inputOriginTransfer).type("Conta Conta Corrente{enter}", {
          delay: 0
        });
        cy.wait(3000);
        break;
      case "tesouraria":
        cy.get(el.inputOriginTransfer).type("Tesouraria{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "conta cofre":
        cy.get(el.inputOriginTransfer).type("Conta Cofre{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "crediario loja":
        cy.get(el.inputOriginTransfer).type("Conta Crediário Loja{enter}", {
          delay: 0
        });
        cy.wait(3000);
        break;
      default:
        cy.get(el.inputOriginTransfer).type("PIX{enter}", {delay: 0});
        cy.wait(3000);
        break;
    }
    cy.get(el.btnSelectDestinyTransfer).click();

    switch (accountDestiny) {
      case "pix":
        cy.get(el.inputOriginTransfer).type("PIX{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "conta corrente":
        cy.get(el.inputOriginTransfer).type("Conta Conta Corrente{enter}", {
          delay: 0
        });
        cy.wait(3000);
        break;
      case "tesouraria":
        cy.get(el.inputOriginTransfer).type("Tesouraria{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "conta cofre":
        cy.get(el.inputOriginTransfer).type("Conta Cofre{enter}", {delay: 0});
        cy.wait(3000);
        break;
      case "crediario loja":
        cy.get(el.inputOriginTransfer).type("Conta Crediário Loja{enter}", {
          delay: 0
        });
        cy.wait(3000);
        break;
      default:
        cy.get(el.inputOriginTransfer).type("Conta Conta Corrente{enter}", {
          delay: 0
        });
        cy.wait(3000);
        break;
    }
    cy.get(el.inputValueTransfer).type(value);
    if (historic != undefined) {
      cy.get(el.inputHistoricTransfer).type(historic);
    }
    cy.get(el.btnSaveTransfer).click();
    cy.get(el.msgTransfer).should("be.visible");
  }
  CardReconciliation(startDate, endDate) {
    cy.log(endDate);
    cy.get(el.btnChangeTab).click();
    cy.wait(3000);
    cy.get("body").then(($body) => {
      if ($body.find(".mb-smqm-menu").length == 0) {
        cy.get(el.btnChangeTab).click();
      }
    });
    cy.contains("div", "Financeiro").click({force: true});
    cy.get(el.tabCardReconciliation).click();
    cy.get(el.inputStarDate).type(startDate);
    cy.get(el.inputEndDate).type(endDate);
    cy.get(el.btnSelectCardMachine).click();
    cy.contains("span", "Machine testezim").click();
    cy.get(el.btnSearchCardReconciliation).click();
    cy.get("body").then(($body) => {
      cy.log($body.find(".check-entrys-account-header").length);
      if ($body.find(".check-entrys-account-header").length > 0) {
        cy.get(el.btnConfer).click({multiple: true});
        cy.get(el.btnConciliate).click();
      } else {
        endDate = justNumbers(endDate) + 10000;
        if (endDate.length <= 7) {
          cy.get(el.inputEndDate)
            .clear()
            .type("0" + endDate);
          cy.get(el.btnSearchCardReconciliation).click();
          cy.get(el.btnConfer).click({multiple: true});
          cy.get(el.btnConciliate).click();
        }
      }
    });
  }
  ComissionClosed(dateDue) {
    cy.get(el.tabComissionClosed).click();
    cy.get(el.btnEmploy).click();
    cy.get(el.inputEmploy).type("Eduardo Tampelini{enter}");
    cy.get(el.btnProcessComission).click();
    cy.get(el.btnGenerateAccount).click();
    cy.get(el.inputDue).type(dateDue);
    cy.get(el.btnFinishComissionClosed).click({force: true});
    cy.contains("div", " Título gerado com sucesso. ").should("be.visible");
  }
}

export default new Cashier();
