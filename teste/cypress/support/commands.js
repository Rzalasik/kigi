import {
  bodyprovider,
  bodyCreateTitlePlayable,
  bodyCreateStockTransfer,
  bodyCreateTitleReceive,
  bodySerchTitle,
  bodyCreateConsigmentOrder,
  bodyCreateSale,
  bodyCreditCouponCreate,
  bodyCreateNewProduct
} from "../fixtures/body.js";

Cypress.Commands.add("closeModalIfShows", (modalSelector, buttonSelector, maxWaitMs = 4000) => {
  cy.window({log: false}).then((win) => {
    return new Cypress.Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        // Cypress.$ supports jQuery extensions like :contains() and :visible
        const $el = Cypress.$(modalSelector, win.document).filter(":visible");
        if ($el.length > 0) resolve(true);
        else if (Date.now() - start > maxWaitMs) resolve(false);
        else setTimeout(check, 50);
      };
      check();
    });
  }).then((found) => {
    if (!found) return;
    if (typeof buttonSelector === "string" && buttonSelector.startsWith("text:")) {
      cy.contains("button", buttonSelector.slice(5)).should("be.visible").click();
    } else {
      cy.get(buttonSelector).should("be.visible").click();
    }
  });
});

Cypress.Commands.add("fillMbgSelect", (fakeInputSelector, text) => {
  cy.get(fakeInputSelector).click();

  cy.focused()
    .should("have.attr", "placeholder", "Digite algo para pesquisar...")
    .type(text, { delay: 50, force: true });

  // Polling adaptativo (50ms / 5s) - espera .focused aparecer antes de clicar.
  // Se nao aparecer em 5s, fallback Enter (campos enable-enter sem match).
  cy.window({ log: false }).then((win) => {
    return new Cypress.Promise((resolve) => {
      const start = Date.now();
      const maxWait = 5000;
      const check = () => {
        const focused = win.document.querySelectorAll(
          "ul.ul-options li.mbg-item-select.focused"
        );
        const visible = Array.from(focused).filter(
          (el) => el.offsetParent !== null
        );
        if (visible.length > 0) {
          resolve(visible[0]);
          return;
        }
        if (Date.now() - start > maxWait) {
          resolve(null);
          return;
        }
        setTimeout(check, 50);
      };
      check();
    });
  }).then((focusedEl) => {
    if (focusedEl) {
      cy.wrap(focusedEl).click({ force: true });
    } else {
      cy.focused().type("{enter}", { force: true });
    }
  });
});

Cypress.Commands.add("ClearProviderForXml", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env(
      "urlApi"
    )}/api/person/list-by-role?active=ALL&page=1&pageSize=9&param=${Cypress.env(
      "providerDocument"
    )}&roleCategory=PROVIDER&sortDir=asc&sortField=id`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    }
  }).then((dataSearch) => {
    if (dataSearch.body.values.length > 0) {
      cy.request({
        method: "PUT",
        url: `${Cypress.env("urlApi")}/api/juridica/${dataSearch.body.values[0].id}`,
        headers: {
          Gumgatoken: localStorage.getItem("token")
        },
        body: bodyprovider(dataSearch.body.values[0].id)
      });
    }
  });
});

Cypress.Commands.add("VisitSystem", () => {
  cy.visit(Cypress.env("urlApp"), {
    onBeforeLoad: (browser) => {
      const data = {
        clientId: null,
        organizationLogo: null,
        timeOfCreation: "1709550862007",
        login: Cypress.env("login"),
        picture: null,
        token: localStorage.getItem("token"),
        idUser: Cypress.env("idUser"),
        maxShortTokens: null,
        instanceId: Cypress.env("instanceId"),
        operations: Cypress.env("operations"),
        organization: Cypress.env("organization"),
        name: Cypress.env("name"),
        organizationHierarchyCode: Cypress.env("organizationHierarchyCode"),
        instanceOrganizationHierarchyCode: "100000.",
        lastPasswordUpdate: "2000-02-03T02:00:00Z",
        timeOfExpiration: "1709552662007",
        razaoSocial: null,
        internalCode: null
      };
      const dataUserguideEvents = {
        start: false,
        complete: false,
        steps: []
      };

      browser.localStorage.setItem("user", JSON.stringify(data));
      browser.localStorage.setItem("operations", Cypress.env("operations"));
      browser.localStorage.setItem(
        "ug-guide-events",
        JSON.stringify(dataUserguideEvents)
      );
    }
  });
});

Cypress.Commands.add(
  "MakeTitlePayable",
  (numbertitle, value, actualDate, provider, documentProvider) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("urlApi")}/api/financeintegration/title/only-save`,
      headers: {
        Gumgatoken: localStorage.getItem("token")
      },
      body: bodyCreateTitlePlayable(
        numbertitle,
        value,
        actualDate,
        provider,
        documentProvider
      )
    }).then((datalogin) => {
      cy.log(datalogin.status);
      cy.log(datalogin.body);
    });
  }
);

Cypress.Commands.add("MakeStockTransfer", (barCode, qtd) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/stock-transfer/save-transfer/`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodyCreateStockTransfer(barCode, qtd, false)
  }).then((dataST) => {
    cy.log(dataST.body.originMovementId);
    cy.request({
      method: "POST",
      url: `${Cypress.env("urlApi")}/api/stock-transfer/do-transfer/`,
      headers: {
        Gumgatoken: localStorage.getItem("token")
      },
      body: bodyCreateStockTransfer(
        barCode,
        qtd,
        true,
        dataST.body.id,
        dataST.body.originMovementId,
        dataST.body.originSequencialCode
      )
    }).then((data) => {
      cy.log(data.body.status);
    });
  });
});

Cypress.Commands.add(
  "MakeTitleReceive",
  (numbertitle, value, actualDate, client, documentClient) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("urlApi")}/api/financeintegration/title/only-save`,
      headers: {
        Gumgatoken: localStorage.getItem("token")
      },
      body: bodyCreateTitleReceive(
        numbertitle,
        value,
        actualDate,
        client,
        documentClient
      )
    }).then((data) => {});
  }
);

Cypress.Commands.add("SearchTitleValidate", (search, empty = false) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/financeintegration/titleparcel/new-search`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodySerchTitle(search)
  }).then((data) => {
    if (empty) {
      expect(data.body.values.length).be.eq(0);
    }
  });
});

Cypress.Commands.add("CreateNewConsigmentOrder", () => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/consignment/order`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodyCreateConsigmentOrder()
  }).then((data) => {
    const idOrder = data.body.data.id;
    const sequencialCode = data.body.data.sequencialCode;
    const movemenntDate = data.body.data.movementDate;
    cy.log(idOrder);
    cy.log(sequencialCode);
    let bodyOrder = data.body.data;
    bodyOrder.status = "PENDING";
    const bodyOrderJ = bodyOrder;
    cy.log(JSON.stringify(bodyOrder.status));
    cy.request({
      method: "POST",
      url: `${Cypress.env("urlApi")}/api/consignment/order/domovement/`,
      headers: {
        Gumgatoken: localStorage.getItem("token")
      },
      body: bodyOrderJ
    }).then((data) => {
      cy.log(data.status);
    });
  });
});
Cypress.Commands.add("CreateNewSale", () => {
  const bodySale = bodyCreateSale();
  bodySale.status = "FINISH";
  bodySale.payments = [
    {
      type: "ENTRY",
      dtype: "br.com.mobiage.manager.domain.model.pdv.Payment",
      value: 120,
      paymentType: {
        id: 782,
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        version: 0,
        name: "Dinheiro",
        icon: "fa fa-money",
        paymentMethod: "DINHEIRO",
        accountType: "CAIXA_FISICO",
        paymentType: "MONEY"
      },
      change: 0,
      transactionType: "MONEY"
    }
  ];
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/sale`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodySale
  });
});

Cypress.Commands.add("CreateNewCreditCoupon", (value) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/discount-coupon/loose-credit?fromFinaceUnit=68622134`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodyCreditCouponCreate(value)
  });
});

Cypress.Commands.add("CreateNewProduct", (nameProduct) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("urlApi")}/api/v2/product?upkeepMotivation=true`,
    headers: {
      Gumgatoken: localStorage.getItem("token")
    },
    body: bodyCreateNewProduct(nameProduct)
  });
});
