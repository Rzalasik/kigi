/// <reference types="cypress"/>
import Login from "../support/Login/page-login";
import KitProduct from "../support/Kit-Product/page-kit-product";
import Product from "../support/Product/page-product";
import Provider from "../support/Provider/page-provider";
import Pricesheet from "../support/Pricesheet/page-pricesheet";
import Consignment from "../support/Consignment/page-consignment";
import ReservedStock from "../support/Reserved-Stock/page-reserved-stock";
import ProductType from "../support/Product-Type/page-product-type";
import {qase} from "cypress-qase-reporter/mocha";

describe("Produtos", () => {
  beforeEach(function () {
    Login.StartLogin();
    cy.VisitSystem();
  });

  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    422,
    it("Entrada do produto no produto", () => {
      Product.getStock("7112320456474");
      Product.StockReceipt("7112320456474", 1);
      Product.ValidateStockReceipt("7112320456474", 1);
    })
  );

  qase(
    427,
    it("Realizar cadastro de Produto", () => {
      Product.MakeRegisterProduct(true, 10);
    })
  );

  qase(
    428,
    it("Realizar cadastro de Produto", () => {
      Product.MakeRegisterProductWithoutDetails(true, 10);
    })
  );
});
