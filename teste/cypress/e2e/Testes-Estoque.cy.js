/// <reference types="cypress"/>
import Stock from "../support/Stock/page-stock";
import Product from "../support/Product/page-product";
import Provider from "../support/Provider/page-provider";
import Login from "../support/Login/page-login";
import {qase} from "cypress-qase-reporter/mocha";

describe.skip("Entrada de XML", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    424,
    it.skip("Entrada de estoque via XML de fornecedor", () => {
      7112320364847;
      Product.getStock("7112320364847");
      Stock.StartReceiptXML();
      Stock.LinkProduct(true);
      Stock.FinishReceiptXml();
      Product.ValidateStockReceipt("7112320364847", 1);
    })
  );
});

describe("Entrada manual", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    423,
    it("Entrada manual de estoque via Estoque -> Entrada", () => {
      Product.getStock("7112320456474");
      Stock.StartReceipt();
      Stock.AddProductConsultQuantity(["7112320456474"], 35);
      Stock.FinishReceipt();
      Product.ValidateStockReceipt("7112320456474", 35);
    })
  );
});
