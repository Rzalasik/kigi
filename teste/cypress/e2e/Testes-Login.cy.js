/// <reference types="cypress"/>
import Login from "../support/Login/page-login";
import {qase} from "cypress-qase-reporter/mocha";

describe("Login", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  qase(
    597,
    it("Login com as credenciais corretas", () => {
      Login.MakeLoginValidCredentials();
    })
  );

  qase(
    598,
    it("Login com as credenciais incorretas", () => {
      Login.MakeLoginInvalidCredentials();
    })
  );
});
