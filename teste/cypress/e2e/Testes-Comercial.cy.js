/// <reference types="cypress"/>
import Login from "../support/Login/page-login";
import Sale from "../support/Sale/page-sale";
import Product from "../support/Product/page-product";
import Promotion from "../support/Promotion/page-promotion";
import Exchange from "../support/Exchange/page-exchange";
import {qase} from "cypress-qase-reporter/mocha";

describe("Venda", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  qase(
    289,
    it("Realizar venda criando novo cliente com cadastro simples", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleCreatingClient();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPaymentSendNFCE();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    291,
    it("Realizar venda com cadastro completo do cliente a partir da tela de venda", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleCreatingClientRegisterComplete();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    292,
    it("Realizar venda com consumidor final sem CPF (cliente genérico)", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleForFinalConsumer();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );

  qase(
    304,
    it("Realizar venda com desconto aplicado diretamente no item (sem promoção ativa)", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.GetValueTotalSaleInProduct();
      Sale.ApplyDiscountInProduct();
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    305,
    it("Realizar venda de produto com promoção ativa", () => {
      Product.getStock("7112320454647");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320454647"]);
      Promotion.ValidateProductOnPromotionInSale();
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320454647", 1);
    })
  );
  qase(
    379,
    it("Realizar venda aplicando desconto no faturamento", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.ApplyDiscount(3700);
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    429,
    it("Realizar venda aplicando acréscimo no faturamento", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.ApplyAddiction(3700);
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    380,
    it("Realizar venda aplicando acréscimo no faturamento", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.ValidateEmploy();
      Sale.PaymentMoneyTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
});
describe("Múltiplas formas de pagamento", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    293,
    it("Realizar venda com pagamento Cartão de Crédito + Crédito na loja", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCardCreditPartial(4000, 1);
      Sale.PaymentCoupons();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    294,
    it("Realizar venda com pagamento Crédito na loja + Dinheiro", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyPartial(4000);
      Sale.PaymentCoupons();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    295,
    it("Realizar venda com pagamento Cartão de Crédito + Dinheiro", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyPartial(4000);
      Sale.PaymentCardCreditTotal(1);
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    296,
    it("Realizar venda com pagamento Cartão de Crédito + Cartão de Débito", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentCardDebitPartial(4000);
      Sale.PaymentCardCreditTotal(1);
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    297,
    it("Realizar venda com pagamento Cartão de Crédito + Depósito", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymenteDepositPartial(4000);
      Sale.PaymentCardCreditTotal(1);
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    300,
    it("Realizar venda com pagamento Crédito na loja + Depósito", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymenteDepositPartial(4000);
      Sale.PaymentCoupons();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    301,
    it("Realizar venda com pagamento Cartão de Débito + Dinheiro", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyPartial(4000);
      Sale.PaymentCardDebitTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    302,
    it("Realizar venda com pagamento Cartão de Débito + Dinheiro", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyPartial(4000);
      Sale.PaymenteDepositTotal();
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    303,
    it("Realizar venda com pagamento Crediário Loja + Depósito", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymenteDepositPartial(4000);
      Sale.PaymentCreditTotal(3, 23);
      Sale.FinishPayment();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
});

describe("Troca", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    384,
    it("Troca com etiqueta de presente", () => {
      cy.CreateNewSale().then((data) => {
        let dataSale = data.body.data;
        Exchange.StartExchangeByCardPresent(dataSale.id);
      });
      Exchange.AddProductBarcode(["7112320456474"]);
      Exchange.ContinueExchange();
      Exchange.FinishExchange();
    })
  );
  qase(
    386,
    it("Troca com cliente selecionado referenciando venda e valor igual ao produto devolvido", () => {
      cy.CreateNewSale();
      Exchange.StartExchange();
      Exchange.MakeExchangeReferenceSale();
      Exchange.AddProductBarcode(["7112320456474"]);
      Exchange.ContinueExchange();
      Exchange.FinishExchange();
    })
  );
  qase(
    387,
    it("Troca avulsa sem informar venda com valor igual", () => {
      Exchange.StartExchange();
      Exchange.ReceiptNotReportSale();
      Exchange.AddProductBarcodeReceipt(["7112320456474"]);
      Exchange.ContinueExchangeChoseProduct();
      Exchange.AddProductBarcode(["7112320456474"]);
      Exchange.ContinueExchange();
      Exchange.FinishExchange();
    })
  );
  qase(
    390,
    it("Troca sem informar venda com produto de maior valor (pagamento da diferença)", () => {
      Exchange.StartExchange();
      Exchange.ReceiptNotReportSale();
      Exchange.AddProductBarcodeReceipt(["7112320456474"]);
      Exchange.ContinueExchangeChoseProduct();
      Exchange.AddProductBarcode(["7112320454647 x 2"]);
      Exchange.ContinueExchange();
      Exchange.ContinueExchangePayment();
      Exchange.PaymentMoneyTotal();
      Exchange.FinishPayment();
    })
  );
  qase(
    391,
    it("Troca sem informar venda com produto de menor valor (devolução como crédito)", () => {
      Exchange.StartExchange();
      Exchange.ReceiptNotReportSale();
      Exchange.AddProductBarcodeReceipt(["7112320456474"]);
      Exchange.ContinueExchangeChoseProduct();
      Exchange.AddProductBarcode(["7112320407681"]);
      Exchange.ContinueExchange();
      Exchange.ContinueExchangeDevolution();
      Exchange.GeneratesCoupons();
    })
  );
  qase(
    392,
    it("Troca sem informar venda com produto de menor valor (devolução em dinheiro)", () => {
      Exchange.StartExchange();
      Exchange.ReceiptNotReportSale();
      Exchange.AddProductBarcodeReceipt(["7112320456474"]);
      Exchange.ContinueExchangeChoseProduct();
      Exchange.AddProductBarcode(["7112320407681"]);
      Exchange.ContinueExchange();
      Exchange.ContinueExchangeDevolution();
      Exchange.ReturnMoney();
    })
  );
});
