/// <reference types="cypress"/>
import Cashier from "../support/Cashier/page-cashier";
import Login from "../support/Login/page-login";
import Sale from "../support/Sale/page-sale";
import Product from "../support/Product/page-product";
import Receivable from "../support/Receivable/page-receivable";
import {faker} from "@faker-js/faker";
import {qase} from "cypress-qase-reporter/mocha";

describe("Caixa", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    426,
    it("Fechamento de caixa sem troco e sem imprimir relatório", () => {
      Cashier.ClosedCashier(true, 0);
    })
  );

  qase(
    425,
    it("Abertura de caixa com seleção e dados de abertura", () => {
      Cashier.OpenCashier(true, 10);
    })
  );

  qase(
    409,
    it("Realizar suplemento de caixa e validar contas movimentadas", () => {
      Cashier.GetValueCashierMoney();
      Cashier.GetValueCashierTreasury();
      Cashier.MovementInput("tesouraria", 10000, "sim", "teste de observação");
      Cashier.ValidateValueCashierMoney(10000, "add");
      Cashier.ValidateValueCashierTreasury(10000, "sub");
    })
  );

  qase(
    410,
    it("Realizar sangria de caixa e validar movimentação financeira", () => {
      Cashier.GetValueCashierMoney();
      Cashier.GetValueCashierTreasury();
      Cashier.MovementOutput(
        "tesouraria",
        10000,
        "sim",
        "teste de movimentacao de saida"
      );
      Cashier.ValidateValueCashierMoney(10000, "sub");
      Cashier.ValidateValueCashierTreasury(10000, "add");
    })
  );
  it("Criação de venda com as formas de pagamento que vão ser utilizadas", () => {
    Sale.MakeSaleWithEmployee();
    Sale.AddProductBarcode(["7112320456474"]);
    Sale.ContinueToBilling();
    Sale.PaymentCardDebitPartial(10);
    Sale.PaymenteDepositPartial(10);
    Sale.PaymentCreditPartial(1, 23, 10);
    Sale.PaymentCardCreditTotal(1);
    Sale.FinishPayment();
  });
});
describe("Dinheiro", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });
  qase(
    407,
    it("Processo completo de venda com recebimento no caixa via Dinheiro", () => {
      Cashier.GetValueCashierMoney();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierMoney(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    408,
    it("Estorno de venda com Dinheiro, validando estoque e caixa", () => {
      Cashier.GetValueCashierMoney();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierMoney(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
      Sale.ChargebackByHistoric();
      Cashier.ValidateValueCashierMoney();
      Product.ValidateStockIssue("7112320456474", 0);
    })
  );

  qase(
    411,
    it("Receber conta de cliente e confirmar registro no caixa", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierMoney();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentMoneyTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierMoney(10000, "add");
    })
  );

  qase(
    416,
    it("Receber conta de cliente e confirmar registro no caixa", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierMoney();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentMoneyTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierMoney(10000, "add");
      Receivable.ChargebackReceivable("testeteste", numberTitle);
      Cashier.ValidateValueCashierMoney();
    })
  );
});
describe("Cartão", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  qase(
    401,
    it("Processo completo de venda com recebimento no caixa via Cartão de crédito", () => {
      Cashier.GetValueCashierCreditCard();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCardCreditTotal(1);
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCreditCard(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    402,
    it("Estorno de venda com Cartão de crédito validando caixa", () => {
      Cashier.GetValueCashierCreditCard();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCardCreditTotal(1);
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCreditCard(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
      Sale.ChargebackByHistoric();
      Cashier.ValidateValueCashierCreditCard();
      Product.ValidateStockIssue("7112320456474", 0);
    })
  );

  qase(
    412,
    it("Receber conta via Cartão de crédito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierCreditCard();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentCardCreditTotal(1);
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCreditCard(10000, "add");
    })
  );
  qase(
    415,
    it("Estornar recebimento de conta via Cartão de Crédito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierCreditCard();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentCardCreditTotal(1);
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCreditCard(10000, "add");
      Receivable.ChargebackReceivable("testeteste", numberTitle);
      Cashier.ValidateValueCashierCreditCard();
    })
  );

  qase(
    413,
    it("Receber conta via Cartão de débito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierDebitCard();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentCardDebitTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDebitCard(10000, "add");
    })
  );

  qase(
    418,
    it("Estornar recebimento de conta via Cartão de Débito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierDebitCard();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymentCardDebitTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDebitCard(10000, "add");
      Receivable.ChargebackReceivable("testeteste", numberTitle);
      Cashier.ValidateValueCashierDebitCard();
    })
  );
});

describe("Deposito", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  qase(
    405,
    it("Processo completo de venda com recebimento no caixa via Depósito", () => {
      Cashier.GetValueCashierDeposit();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymenteDepositTotal();
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDeposit(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    406,
    it("Estorno de venda com Depósito, validando estoque e caixa", () => {
      Cashier.GetValueCashierDeposit();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymenteDepositTotal();
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDeposit(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
      Sale.ChargebackByHistoric();
      Cashier.ValidateValueCashierDeposit();
      Product.ValidateStockIssue("7112320456474", 0);
    })
  );

  qase(
    419,
    it("Receber conta com pagamento via Depósito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierDeposit();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymenteDepositTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDeposit(10000, "add");
    })
  );

  qase(
    417,
    it("Receber conta com pagamento via Depósito", (numberTitle = faker.finance.accountNumber()) => {
      Cashier.GetValueCashierDeposit();
      cy.MakeTitleReceive(numberTitle, 100);
      Receivable.ReceiveAReceivable(numberTitle);
      Receivable.PaymenteDepositTotal();
      Receivable.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierDeposit(10000, "add");
      Receivable.ChargebackReceivable("testeteste", numberTitle);
      Cashier.ValidateValueCashierDeposit();
    })
  );
});

describe("Crediário", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  qase(
    403,
    it("Processo completo de venda com recebimento no caixa via Crediário na loja", () => {
      Cashier.GetValueCashierCredit();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCreditTotal(1, 23);
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCredit(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
      Receivable.ValidateCreateTitleFromSale();
    })
  );

  qase(
    404,
    it("Processo completo de venda com recebimento no caixa via Crediário na loja", () => {
      Cashier.GetValueCashierCredit();
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCreditTotal(1, 23);
      Sale.FinishPayment();
      cy.visit(Cypress.env("urlApp"));
      Cashier.ValidateValueCashierCredit(12000, "add");
      Product.ValidateStockIssue("7112320456474", 1);
      Receivable.ValidateCreateTitleFromSale();
      Sale.ChargebackByHistoric();
      Cashier.ValidateValueCashierCredit();
      Product.ValidateStockIssue("7112320456474", 0);
      Receivable.ValidateCreateTitleFromSale(true);
    })
  );
});
