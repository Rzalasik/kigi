const {defineConfig} = require("cypress");
const {afterSpecHook} = require("cypress-qase-reporter/hooks");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "spec, cypress-qase-reporter",
    cypressMochawesomeReporterReporterOptions: {
      charts: true
    },
    cypressQaseReporterOptions: {
      debug: true,
      testops: {
        api: {
          token:
            process.env.QASE_TESTOPS_API_TOKEN ||
            process.env.QASE_TESTOPS_API_TOKEN
        },

        project: process.env.QASE_TESTOPS_PROJECT || "KG",
        uploadAttachments: false,

        run: {
          // id: process.env.QASE_TESTOPS_RUN_ID,
          title:
            process.env.QASE_TESTOPS_RUN_TITLE || "Automated test - API - run"
        },

        batch: {
          size: 20
        }
      },

      framework: {
        cypress: {
          screenshotsFolder: "cypress/screenshots"
        }
      }
    }
  },

  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 50000,
  retries: {
    runMode: 1,
    openMode: 1
  },

  e2e: {
    experimentalOriginDependencies: true,
    video: true,

    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true
    },

    setupNodeEvents(on, config) {
      // Plugins Qase
      require("cypress-qase-reporter/plugin")(on, config);
      require("cypress-qase-reporter/metadata")(on);

      // Hook necessário para versão 3.x enviar resultados
      on("after:spec", async (spec, results) => {
        await afterSpecHook(spec, config, results);
      });

      // Task de log para aparecer no stdout (útil para debug em headless)
      on("task", {
        log(message) {
          console.log(`[CY] ${message}`);
          return null;
        }
      });

      // // ✅ Map env vars do CI -> Cypress.env()
      // // # ===== URLs =====
      config.env.urlLogin = process.env.URL_LOGIN;
      config.env.urlApp = process.env.URL_APP;
      config.env.urlApi = process.env.URL_API;

      // =====================================================
      // ✅ LOGIN
      // =====================================================
      config.env.login = process.env.LOGIN;
      config.env.senha = process.env.SENHA;

      // =====================================================
      // ✅ ORGANIZAÇÃO / FILIAIS
      // =====================================================
      config.env.principalBranch = process.env.PRINCIPAL_BRANCH;
      config.env.secondBranch = process.env.SECOND_BRANCH;
      config.env.organization = process.env.ORGANIZATION;
      config.env.organizationHierarchyCode =
        process.env.ORGANIZATION_HIERARCHY_CODE;
      config.env.organizationHierarchyCodeDestination =
        process.env.ORGANIZATION_HIERARCHY_CODE_DESTINATION;

      // =====================================================
      // ✅ USUÁRIO
      // =====================================================
      config.env.name = process.env.NAME;
      config.env.idUser = process.env.ID_USER;
      config.env.instanceId = process.env.INSTANCE_ID;
      config.env.employ = process.env.EMPLOY;
      config.env.guide = process.env.GUIDE;

      // =====================================================
      // ✅ MAQUINA / IDS DA FILIAL
      // =====================================================
      config.env.machineCardName = process.env.MACHINE_CARD_NAME;
      config.env.documentTypeId = process.env.DOCUMENT_TYPE_ID;
      config.env.walletTitleId = process.env.WALLET_TITLE_ID;
      config.env.planLeafId = process.env.PLAN_LEAF_ID;

      // =====================================================
      // ✅ CLIENTE
      // =====================================================
      config.env.clientNameComplete = process.env.CLIENT_NAME_COMPLETE;
      config.env.clientId = process.env.CLIENT_ID;
      config.env.clientIndividualId = process.env.CLIENT_INDIVIDUAL_ID;
      config.env.clientIntegrationId = process.env.CLIENT_INTEGRATION_ID;
      config.env.clientDocument = process.env.CLIENT_DOCUMENT;
      config.env.client = process.env.CLIENT;
      config.env.clientOutOfState = process.env.CLIENT_OUT_OF_STATE;
      config.env.clientLinkEmploy = process.env.CLIENT_LINK_EMPLOY;
      config.env.clientLinkEmployInactive =
        process.env.CLIENT_LINK_EMPLOY_INACTIVE;
      config.env.clientPersonAuthorized = process.env.CLIENT_PERSON_AUTHORIZED;

      // =====================================================
      // ✅ FORNECEDOR
      // =====================================================
      config.env.provider = process.env.PROVIDER;
      config.env.providerDocument = process.env.PROVIDER_DOCUMENT;

      // =====================================================
      // ✅ PRODUTOS
      // =====================================================
      config.env.products = process.env.PRODUCTS
        ? JSON.parse(process.env.PRODUCTS)
        : undefined;

      config.env.productShared = process.env.PRODUCT_SHARED;
      config.env.productNotShared = process.env.PRODUCT_NOT_SHARED;
      // Mantem capital C para casar com Cypress.env('Catalogy') usado no codigo
      config.env.Catalogy = process.env.CATALOGY;

      // =====================================================
      // ✅ EVENDI
      // =====================================================
      config.env.evendiDomain = process.env.EVENDI_DOMAIN;
      config.env.evendiSite = process.env.EVENDI_SITE;

      // =====================================================
      // ✅ PERMISSÕES
      // =====================================================
      config.env.operations = process.env.OPERATIONS
        ? JSON.parse(process.env.OPERATIONS)
        : undefined;

      return config;
    }
  }
});
