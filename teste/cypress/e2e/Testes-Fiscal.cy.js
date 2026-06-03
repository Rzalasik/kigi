/// <reference types="cypress"/>
import Login from "../support/Login/page-login";
import Note from "../support/Note/page-note";
import Sale from "../support/Sale/page-sale";
import Product from "../support/Product/page-product";
import {qase} from "cypress-qase-reporter/mocha";

describe("Fiscal", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    381,
    it("Venda com emissão de NFC-e para cliente consumidor final", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleForFinalConsumer();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishPaymentSendNFCE();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    382,
    it("Venda com emissão de NF-e para cliente interno (mesmo estado)", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleWithEmployee();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishpaymentSendNFE();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
  qase(
    383,
    it("Venda com emissão de NF-e para cliente externo (outro estado)", () => {
      Product.getStock("7112320456474");
      Sale.MakeSaleClientOutOfState();
      Sale.AddProductBarcode(["7112320456474"]);
      Sale.ContinueToBilling();
      Sale.PaymentMoneyTotal();
      Sale.FinishpaymentSendNFE();
      Product.ValidateStockIssue("7112320456474", 1);
    })
  );
});
