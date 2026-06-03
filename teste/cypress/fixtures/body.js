import {faker} from "@faker-js/faker";

export function bodyprovider(id) {
  return {
    type: "Juridica",
    id: id,
    oi: {
      value: Cypress.env("organizationHierarchyCode")
    },
    gumgaOrganizations: ",B1023920.MO,",
    gumgaUsers: ",",
    clazz_: null,
    name: faker.company.name(),
    addressList: [
      {
        id: 161255140,
        oi: {
          value: Cypress.env("organizationHierarchyCode")
        },
        version: 1,
        description: null,
        address: {
          zipCode: "87200234",
          premisseType: "PRAÇA",
          premisse: "Praça Santos Dumont",
          number: "141",
          information: "",
          neighbourhood: "Zona 01",
          localization: "Cianorte",
          state: "PR",
          country: "Brasil",
          latitude: 0,
          longitude: 0,
          formalCode: "4105508",
          stateCode: "41",
          countryCode: "1058"
        },
        primary: true
      }
    ],
    phones: [],
    emails: [],
    socialNetworks: [],
    relationships: [
      {
        id: 161255141,
        oi: {
          value: Cypress.env("organizationHierarchyCode")
        },
        version: 0,
        description: null,
        person: null,
        dateofBirth: null,
        dayofbirthday: null,
        monthofbirthday: null,
        name: null,
        phone: null,
        cpf: null,
        docRg: null
      }
    ],
    roles: [
      {
        id: 161255142,
        oi: {
          value: Cypress.env("organizationHierarchyCode")
        },
        version: 0,
        active: true,
        role: {
          id: 800,
          oi: null,
          gumgaOrganizations: ",",
          gumgaUsers: ",",
          version: 0,
          name: "Fornecedor",
          color: "#f8ac59",
          category: "PROVIDER",
          integrationId: 2
        }
      }
    ],
    since: null,
    active: true,
    dateofbirthorfoundation: null,
    dayofbirthday: null,
    monthofbirthday: null,
    nickname: faker.company.name(),
    group: {
      id: -90015,
      oi: null,
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      version: 0,
      name: "5.PJ-Pessoa Jurídica DENTRO do Estado - ISENTO de IE",
      description: "5.PJ-Pessoa Jurídica DENTRO do Estado - ISENTO de IE",
      active: true,
      integrationId: null,
      shareRule: "MYSELF"
    },
    hierarchy: `${id}.`,
    branches: [],
    father: null,
    integrationId: null,
    billAddressList: [],
    file: null,
    ruralInscription: null,
    ruralProducer: null,
    financeValid: null,
    emissorOrgan: null,
    gender: null,
    clientGroup: null,
    isShared: true,
    operatorPassword: null,
    operatorCode: null,
    operatorType: null,
    personReferences: [],
    limitCredit: 0,
    limitCreditConsignment: 0,
    mannequins: [],
    financialReference: null,
    preferredSeller: null,
    memos: [],
    blockMotive: null,
    documents: [],
    thirdiesAuthorizeds: [],
    naturalness: null,
    tags: [],
    recipes: [],
    idOffline: null,
    shareRule: "MYBASE",
    observation: null,
    shoppingGuide: null,
    created: "2023-08-11T11:15:51Z",
    search: `${faker.company.name()} ${id}`,
    finalConsumerSearch: false,
    priceSheetType: null,
    personCategory: null,
    updatedAt: "2024-09-16T18:53:50Z",
    globalDocument: null,
    sharePersonLimit: null,
    paymentTypesControl: [],
    personIntegration: {
      id: null,
      enable: false,
      enabledAt: null,
      updatedAt: null,
      error: null,
      personIntegrationType: null
    },
    cnpj: null,
    stateRegistration: "1310122137",
    municipalRegistration: null,
    indicators: null,
    stateRegistrationSt: null,
    referencesContact: []
  };
}
export function bodyCreateTitlePlayable(
  numbertitle,
  value,
  actualDate = new Date(),
  provider = Cypress.env("provider"),
  documentProvider = Cypress.env("providerDocument")
) {
  return {
    id: null,
    oi: {
      value: Cypress.env("organizationHierarchyCode")
    },
    gumgaActive: true,
    idIntegracao: null,
    titleType: "PAY",
    value: value,
    parcel: [
      {
        number: 1,
        value: value,
        expiration: actualDate.toISOString().split(".")[0] + "Z",
        operationCategory: "AVULSO",
        planEntriesToSave:
          '[{"value":' +
          value +
          ',"planLeaf":{"id":"958483089","reduced":"27","code":"01.01.01","name":"VENDA DE PRODUTOS","accountType":"Analítica","groupDre":"01.01","active":true,"$$hashKey":"object:6382"},"momment":"' +
          actualDate.toISOString().split(".")[0] +
          "Z" +
          '","effectiveMomment":"' +
          actualDate.toISOString().split(".")[0] +
          "Z" +
          '"}]'
      }
    ],
    postedAt: actualDate.toISOString().split(".")[0] + "Z",
    emissionDate: actualDate.toISOString().split(".")[0] + "Z",
    documentType: {
      id: 68622887,
      oi: {
        value: Cypress.env("organizationHierarchyCode")
      },
      idIntegracao: 3,
      name: "Tipo de Documento Padrão"
    },
    assignedIndividual: {
      id: 966773731,
      oi: {
        value: "100663.100664.104287."
      },
      gumgaOrganizations: ",B370208.MO,",
      gumgaUsers: ",",
      integrationValue: {
        integrationId: 966773727,
        integrationInfo: "85404421000130"
      },
      name: provider,
      secundaryName: "",
      primaryDocument: documentProvider,
      secondaryDocument: "ISENTO",
      individualType: "JURIDICA",
      addressList: null,
      phonesList: null,
      emailsList: null,
      beneficiaryValues: null,
      preferentialRatioPlan: null,
      individualLabels: null,
      employeeValue: null,
      thirdId: null,
      shortName: null
    },
    participations: [
      {
        id: null,
        oi: {
          value: Cypress.env("organizationHierarchyCode")
        },
        value: 1,
        individual: null
      }
    ],
    documentNumber: numbertitle,
    memo: null,
    numberParcel: 1,
    fullPaid: false,
    automaticFinanceUnit: null,
    automaticaPayment: null,
    registerAsPayed: null,
    walletTitle: null,
    labels: null,
    planLeafs: null,
    hasPayment: false,
    hasRatio: false,
    ratioPlan: null,
    parcelinterest: 0,
    parcelpenalty: 0,
    parcelMora: 0,
    isRenegotiate: false,
    number: null,
    accountType: null,
    issuedAt: null,
    replacedTitleParcels: null,
    parcelsToReplace: null,
    replacedBy: null,
    isReversed: false,
    typeCategory: null,
    financeUnitGroupId: null,
    planEntries: [
      {
        momment: actualDate.toISOString().split(".")[0] + "Z",
        planLeaf: {
          id: "958483089",
          reduced: "27",
          code: "01.01.01",
          name: "VENDA DE PRODUTOS",
          accountType: "Analítica",
          groupDre: "01.01",
          active: true
        },
        value: value
      },
      {
        momment: actualDate.toISOString().split(".")[0] + "Z"
      }
    ],
    authorizedName: null,
    participationsFormatted: "",
    typevalue: "Percentual",
    processExecuted: true,
    expiration: actualDate.toISOString().split(".")[0] + "Z"
  };
}
export function bodyCreateTitleReceive(
  numbertitle,
  value,
  actualDate = new Date(),
  Client = Cypress.env("clientNameComplete"),
  documentClient = Cypress.env("clientDocument")
) {
  return {
    id: null,
    oi: {
      value: Cypress.env("organizationHierarchyCode")
    },
    gumgaActive: true,
    idIntegracao: null,
    titleType: "RECEIVE",
    value: value,
    parcel: [
      {
        number: 1,
        value: value,
        expiration: actualDate.toISOString().split(".")[0] + "Z",
        operationCategory: "AVULSO",
        planEntriesToSave:
          '[{"value":' +
          value +
          ',"planLeaf":{"id":"958483089","reduced":"27","code":"01.01.01","name":"VENDA DE PRODUTOS","accountType":"Analítica","groupDre":"01.01","active":true,"$$hashKey":"object:6382"},"momment":"' +
          actualDate.toISOString().split(".")[0] +
          "Z" +
          '","effectiveMomment":"' +
          actualDate.toISOString().split(".")[0] +
          "Z" +
          '"}]'
      }
    ],
    postedAt: actualDate.toISOString().split(".")[0] + "Z",
    emissionDate: actualDate.toISOString().split(".")[0] + "Z",
    documentType: {
      id: 68622887,
      oi: {
        value: Cypress.env("organizationHierarchyCode")
      },
      idIntegracao: 3,
      name: "Tipo de Documento Padrão"
    },
    assignedIndividual: {
      id: 966027798,
      oi: {
        value: "100663.100664.104287."
      },
      gumgaOrganizations: ",B370208.MO,",
      gumgaUsers: ",",
      integrationValue: {
        integrationId: 966027795,
        integrationInfo: "01842996088"
      },
      name: Client,
      secundaryName: "",
      primaryDocument: documentClient,
      secondaryDocument: null,
      individualType: "FISICA",
      addressList: null,
      phonesList: null,
      emailsList: null,
      beneficiaryValues: null,
      preferentialRatioPlan: null,
      individualLabels: null,
      employeeValue: null,
      thirdId: null,
      shortName: null
    },
    participations: [
      {
        id: null,
        oi: {
          value: "370208.370209.370210."
        },
        value: 1,
        individual: null
      }
    ],
    documentNumber: numbertitle,
    memo: null,
    numberParcel: 1,
    fullPaid: false,
    automaticFinanceUnit: null,
    automaticaPayment: null,
    registerAsPayed: null,
    walletTitle: {
      id: 68622194,
      oi: {
        value: "370208.370209.370210."
      },
      idIntegracao: null,
      name: "Carteira Padrão",
      interest: {
        valueModifierOperation: "INCREASE",
        valueModifierType: "PERCENTAGE",
        value: 0.05,
        periodicity: "MONTHLY",
        toleranceDay: 3
      },
      penalty: {
        valueModifierOperation: "INCREASE",
        valueModifierType: "PERCENTAGE",
        value: 0.05,
        periodicity: "MONTHLY",
        toleranceDay: 3
      },
      discont: {
        valueModifierOperation: "INCREASE",
        valueModifierType: "PERCENTAGE",
        value: 0,
        periodicity: "DAILY",
        toleranceDay: null
      },
      gracePeriod: 0
    },
    labels: null,
    planLeafs: null,
    hasPayment: false,
    hasRatio: false,
    ratioPlan: null,
    parcelinterest: 0.05,
    parcelpenalty: 0.05,
    parcelMora: 0.16666666666666666,
    isRenegotiate: false,
    number: null,
    accountType: null,
    issuedAt: null,
    replacedTitleParcels: null,
    parcelsToReplace: null,
    replacedBy: null,
    isReversed: false,
    typeCategory: null,
    financeUnitGroupId: null,
    planEntries: [
      {
        momment: actualDate.toISOString().split(".")[0] + "Z",
        planLeaf: {
          id: "958483089",
          reduced: "27",
          code: "01.01.01",
          name: "VENDA DE PRODUTOS",
          accountType: "Analítica",
          groupDre: "01.01",
          active: true
        },
        value: value
      },
      {
        momment: actualDate.toISOString().split(".")[0] + "Z"
      }
    ],
    authorizedName: null,
    participationsFormatted: "",
    typevalue: "Percentual",
    processExecuted: true,
    expiration: actualDate.toISOString().split(".")[0] + "Z"
  };
  cy.log(Client);
}
export function bodyCreateStockTransfer(
  barCode,
  qtd = 1,
  isSave = true,
  idTransfer,
  origimMovimentgroup,
  originSeqCode
) {
  if (isSave) {
    return {
      type: "DEFAULT",
      isSale: true,
      organizationNameOrigin: Cypress.env("principalBranch"),
      organizationCodeOrigin: Cypress.env("organizationHierarchyCode"),
      stockPlaceOrigin: "LOJA",
      movementGroupOrigin: origimMovimentgroup,
      organizationNameDestination: Cypress.env("secondBranch"),
      organizationCodeDestination: Cypress.env(
        "organizationHierarchyCodeDestination"
      ),
      stockPlaceDestination: "LOJA",
      movementGroupDestination: null,
      productsBarCodesAmount: [
        {
          barCode: barCode,
          amount: qtd,
          shared: "MYGROUP",
          movId: null,
          reserved1Available: null,
          saleValue: 120,
          costValue: 10,
          soldValue: 240,
          saleDiscount: 0,
          saleAddition: 0
        }
      ],
      status: "PENDING_ACCEPT",
      dateInit: convertDate(dateToday),
      dateEnd: null,
      transferId: idTransfer,
      priceSheetTypeId: "MOBAAAC410AAA",
      totalItens: null,
      totalProducts: null,
      totalMov: null,
      exitPayments: null,
      isStockReserved: false,
      observation: null,
      sequencialCodeOrigin: originSeqCode,
      sequencialCodeDestiny: 0,
      dateInOut: null,
      total: 240,
      subTotal: 240,
      discount: 0,
      addition: 0,
      freight: 0
    };
  } else {
    return {
      organizationCodeOrigin: Cypress.env("organizationHierarchyCode"),
      organizationCodeDestination: Cypress.env(
        "organizationHierarchyCodeDestination"
      ),
      stockPlaceOrigin: "LOJA",
      stockPlaceDestination: "LOJA",
      productsBarCodesAmount: [
        {
          barCode: barCode,
          amount: qtd,
          shared: "MYGROUP",
          saleValue: 120,
          costValue: 10,
          soldValue: 240,
          saleDiscount: 0
        }
      ],
      isSale: true,
      total: 240,
      subTotal: 240,
      discount: 0,
      addition: 0,
      priceSheetTypeId: "MOBAAAC410AAA"
    };
  }
}
export function bodySerchTitle(search) {
  return {
    page: 1,
    pageSize: 6,
    count: 4573,
    queryDto: {
      query: search,
      typeFilter: "TO_RECEIVED",
      integrationId: "",
      individualId: "",
      phone: "",
      customerCategory: "",
      primaryDocument: "",
      filterDateType: "tp.expiration",
      dateStart: null,
      dateFinish: null,
      type: "RECEIVE",
      originId: null
    }
  };
}

export function bodyCreateConsigmentOrder(actualDate = new Date()) {
  return {
    type: "br.com.mobiage.manager.domain.model.stock.consignment.ConsignmentOrder",
    oi: {
      value: "370208.370209.370210."
    },
    count: 1,
    subTotal: -120,
    discount: 0,
    total: -120,
    movements: [
      {
        hash: "0334518FF6D758C332B1FD4331050AF0",
        type: "br.com.mobiage.manager.domain.model.stock.consignment.ConsignmentItem",
        barCode: {
          id: "3CF4623E1AB779443B535E86919BC464",
          oi: {
            value: "370208.370209.370210."
          },
          gumgaOrganizations: ",B370208.MO,",
          gumgaUsers: ",",
          internalCode: "7112170052109",
          barCode: "7112320346010",
          lowStock: 1,
          active: true,
          integrationId: "325",
          codeBarType: "OWN",
          measureUnit: "UN",
          whoAmI: "ORGANIZATION"
        },
        count: -1,
        oriCount: 1,
        item: {
          id: 967548279,
          oi: {
            value: "370208.370209.370210."
          },
          version: 0,
          count: 5685,
          countTransference: 0,
          item: {
            id: "3CF4623E1AB7744CF91C5E86919BC464",
            oi: {
              value: "370208.370209.370210."
            },
            gumgaOrganizations: ",B370208.MO,",
            gumgaUsers: ",",
            name: "Camisa Ajax",
            active: true,
            integrationId: "325",
            measureUnit: "UN",
            height: 10,
            width: 10,
            depth: 10,
            netWeight: 0.1,
            grossWeight: 0.1,
            productItemBarCodes: [
              {
                id: "3CF4623E1AB779443B535E86919BC464",
                oi: {
                  value: "370208.370209.370210."
                },
                gumgaOrganizations: ",B370208.MO,",
                gumgaUsers: ",",
                internalCode: "7112170052109",
                barCode: "7112320346010",
                lowStock: 1,
                active: true,
                integrationId: "325",
                codeBarType: "OWN",
                measureUnit: "UN",
                whoAmI: "ORGANIZATION"
              }
            ],
            files: [],
            details: [
              {
                id: "3700D5683824B0CAFC88026A0E133CE0",
                gumgaActive: true,
                version: 0,
                type: "COR",
                description: "Vermelho",
                value: "Vermelho",
                valueRef: "#FF0000"
              },
              {
                id: "3700D57DA6BF00009C54026A0E133CE0",
                gumgaActive: true,
                version: 0,
                type: "TAMANHO",
                description: "Tamanho(UN-G5)",
                value: "P",
                valueRef: "2"
              }
            ],
            ignore: false,
            allowExchange: true,
            productSerialNumbers: [],
            search:
              "camisa ajax 398035 vermelho p 7112320346010 7112170052109 holanda 2754",
            hasEvendi: true,
            measuresValues: [],
            color: "Vermelho",
            size: "P",
            isImportTray: false,
            kitCompositions: [],
            shared: "MYGROUP",
            isSerialNumber: false,
            reference: "398035",
            productName: "Camisa Ajax",
            productFiles: [],
            productID: "3CF4623E1AB7701D99C15E86919BC464",
            productTreeName: "Camisa",
            productTreeId: "3700D5680247A0ABDC60026A0E133CE0",
            seqReference: "2754",
            productFiscalGroup: {
              id: 967548278,
              oi: {
                value: "100663.100664.100665."
              },
              gumgaOrganizations: ",",
              gumgaUsers: ",",
              commodityOrigin: "NACIONAL",
              vlIpi: 0,
              vlPis: 0,
              vlCofins: 0,
              ncm: {
                id: 3581,
                version: 1,
                descricao: "PERFUMES (EXTRATOS)",
                codigo: "33030010",
                tipo: "Ncm",
                validityStart: "2016-01-01",
                category:
                  "ÓLEOS ESSENCIAIS E RESINOIDES; PRODUTOS DE PERFUMARIA OU DE TOUCADOR PREPARADOS E PREPARAÇÕES COSMÉTICAS",
                controlType: "UNID"
              },
              cest: {
                id: 14812,
                version: 0,
                descricao: "Perfumes (extratos)",
                codigo: "2000700",
                tipo: "Cest",
                validityStart: "2018-01-01",
                validityEnd: "2023-01-01"
              },
              group: {
                id: 962892898,
                oi: {
                  value: "100663.100664.104287."
                },
                gumgaOrganizations: ",B370208.MO,",
                gumgaUsers: ",",
                version: 2,
                name: "Hello World",
                description: "Heyoooo",
                active: true,
                shareRule: "MYSELF"
              }
            },
            productLine: "",
            productBrand: "Ajax",
            productModel: "Holanda",
            productHasEvendi: true,
            tamanho: {
              id: "3700D57DA6BF00009C54026A0E133CE0",
              gumgaActive: true,
              version: 0,
              type: "TAMANHO",
              description: "Tamanho(UN-G5)",
              value: "P",
              valueRef: "2"
            },
            cor: {
              id: "3700D5683824B0CAFC88026A0E133CE0",
              gumgaActive: true,
              version: 0,
              type: "COR",
              description: "Vermelho",
              value: "Vermelho",
              valueRef: "#FF0000"
            }
          },
          controlUnit: false,
          inInventory: {
            value: false
          },
          consignmentCount: 17,
          countRemittance: 0,
          stockPlace: "LOJA",
          stockMax: 0,
          stockMin: 0,
          countReserved: 30,
          format: "UNIT",
          productSerialNumbers: [],
          evendiStockReserved: 0
        },
        values: [],
        movementType: -1,
        productSerialNumbers: [],
        costValue: 10,
        saleValue: 120,
        soldValue: 120,
        taxedSoldValue: 120,
        taxedSaleValue: 120,
        productName: "Camisa Ajax",
        promotionDiscount: 0,
        informedPrice: false,
        opened1: false,
        totalValue: 120,
        priceSheetType: {
          id: "MOBAAAC410AAA",
          gumgaOrganizations: ",",
          name: "Padrão",
          coefficient: 1,
          variationType: "FIXO",
          gumgaActive: true,
          allowDiscount: true,
          processSyncTypeEvendi: "PROCESSED"
        },
        priceSheet: {
          id: "3CF4623E1AB77D23600A5E86919BC464",
          oi: {
            value: "370208.370209.370210."
          },
          gumgaOrganizations: ",B370208.MO,",
          gumgaUsers: ",",
          name: "Padrão",
          saleValue: 120,
          costValue: 10,
          profit: 11,
          dateCreated: "2024-05-14T20:55:38Z",
          dateActivated: "2024-05-14T20:55:38Z",
          dateFinal: "3950-05-14T20:55:38Z",
          active: true,
          tableVariation: "NORMAL",
          priceSheetType: {
            id: "MOBAAAC410AAA",
            gumgaOrganizations: ",",
            name: "Padrão",
            coefficient: 1,
            variationType: "FIXO",
            gumgaActive: true,
            allowDiscount: true,
            processSyncTypeEvendi: "PROCESSED"
          },
          barcodeId: "3CF4623E1AB779443B535E86919BC464",
          shareRule: "MYGROUP",
          commissionPercentage: 0,
          productitemId: "3CF4623E1AB7744CF91C5E86919BC464"
        },
        newSaleValue: 120,
        unitDiscount: 0,
        saleDiscount: 0,
        vendors: [
          {
            id: 973075209,
            oi: {
              value: "370208.370209.370210."
            },
            gumgaOrganizations: ",",
            gumgaUsers: ",",
            clazz_: null,
            name: "Eduardo Tampelini",
            addressList: null,
            phones: null,
            emails: null,
            socialNetworks: null,
            relationships: null,
            roles: [
              {
                id: 973075211,
                oi: {
                  value: "370208.370209.370210."
                },
                gumgaOrganizations: ",",
                gumgaUsers: ",",
                version: 0,
                active: true,
                role: {
                  id: 802,
                  oi: null,
                  gumgaOrganizations: ",",
                  gumgaUsers: ",",
                  version: 1,
                  name: "Funcionário",
                  color: "#1ab394",
                  category: "EMPLOYEE",
                  integrationId: 4
                }
              }
            ],
            since: "2025-03-07T19:50:24Z",
            active: true,
            dateofbirthorfoundation: null,
            dayofbirthday: null,
            monthofbirthday: null,
            nickname: "",
            group: {
              id: -90013,
              oi: null,
              gumgaOrganizations: ",",
              gumgaUsers: ",",
              version: 0,
              name: "5.PF-Pessoa Física DENTRO do Estado",
              description: "5.PF-Pessoa Física DENTRO do Estado",
              active: true,
              integrationId: null,
              shareRule: "MYSELF"
            },
            hierarchy: null,
            branches: null,
            father: null,
            integrationId: null,
            billAddressList: null,
            file: null,
            ruralInscription: null,
            ruralProducer: null,
            financeValid: null,
            emissorOrgan: null,
            gender: null,
            clientGroup: null,
            isShared: true,
            operatorPassword: null,
            operatorCode: null,
            operatorType: null,
            personReferences: null,
            limitCredit: null,
            limitCreditConsignment: null,
            mannequins: null,
            financialReference: null,
            preferredSeller: null,
            memos: null,
            blockMotive: null,
            documents: null,
            thirdiesAuthorizeds: null,
            naturalness: "",
            tags: null,
            recipes: null,
            idOffline: null,
            shareRule: null,
            observation: null,
            shoppingGuide: null,
            created: "2025-03-07T19:50:56Z",
            search: "eduardo tampelini 973075209",
            finalConsumerSearch: false,
            priceSheetType: null,
            personCategory: null,
            updatedAt: "2025-03-07T19:50:56Z",
            globalDocument: null,
            sharePersonLimit: null,
            paymentTypesControl: [],
            personIntegration: null,
            cpf: null,
            docRg: null,
            securityLogin: null,
            finalConsumer: false,
            commisionPercentage: 0,
            barCodeIndividual: null,
            type: "Individual"
          }
        ]
      }
    ],
    payments: [],
    operationType: {
      category: "CONSIGNMENT_ORDER",
      cfop: null,
      description: null,
      fatherType: null,
      fixedCharacteristics: null,
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      id: 123766,
      informative: false,
      integrationId: null,
      interstate: null,
      invoiceObjective: "NORMAL",
      isUsed: true,
      message: null,
      movementType: -1,
      name: "Pedido de consignado",
      oi: null,
      operationCrud: null,
      stockPlaceDefault: "LOJA",
      uniqueId: -10016,
      useOperationNameNf: false
    },
    movementDate: actualDate.toISOString().split(".")[0] + "Z",
    status: "OPEN",
    nfeList: [],
    targetPerson: {
      type: "Individual",
      id: 966027795,
      oi: {
        value: "100663.100664.104287."
      },
      gumgaOrganizations: ",B370208.MO,",
      gumgaUsers: ",",
      name: "Robertim da Silva",
      addressList: [
        {
          id: 966027796,
          oi: {
            value: "100663.100664.104287."
          },
          version: 0,
          address: {
            zipCode: "87200234",
            premisseType: "PRAÇA",
            premisse: "Praça Santos Dumont",
            number: "33",
            information: "",
            neighbourhood: "Zona 01",
            localization: "Cianorte",
            state: "PR",
            country: "Brasil",
            latitude: 0,
            longitude: 0,
            formalCode: "4105508",
            stateCode: "41",
            countryCode: "1058"
          },
          primary: true
        }
      ],
      phones: [],
      emails: [],
      socialNetworks: [],
      relationships: [],
      roles: [
        {
          id: 966027797,
          oi: {
            value: "100663.100664.104287."
          },
          version: 0,
          active: true,
          role: {
            id: 799,
            gumgaOrganizations: ",",
            gumgaUsers: ",",
            version: 0,
            name: "Cliente",
            color: "#1c84c6",
            category: "CLIENT",
            integrationId: 1
          }
        }
      ],
      since: "2023-11-30T13:37:37Z",
      active: true,
      nickname: "",
      group: {
        id: -90013,
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        version: 0,
        name: "5.PF-Pessoa Física DENTRO do Estado",
        description: "5.PF-Pessoa Física DENTRO do Estado",
        active: true,
        shareRule: "MYSELF"
      },
      branches: [],
      billAddressList: [],
      isShared: true,
      personReferences: [],
      limitCredit: 0,
      limitCreditConsignment: "100",
      mannequins: [],
      memos: [],
      documents: [],
      thirdiesAuthorizeds: [],
      naturalness: "",
      tags: [],
      recipes: [],
      shareRule: "MYGROUP",
      created: "2023-11-30T13:38:11Z",
      search: "robertim da silva 01842996088 966027795",
      finalConsumerSearch: false,
      updatedAt: "2024-09-20T13:30:03Z",
      paymentTypesControl: [],
      personIntegration: {
        enable: false
      },
      cpf: "01842996088",
      finalConsumer: false,
      commisionPercentage: 0
    },
    vendors: [],
    valueDiscount: 0,
    valueAddition: 0,
    addition: 0,
    pdv: null,
    saleTag: {
      id: 38,
      tagType: "PRESENTIAL",
      tag: "Loja"
    },
    priceSheetType: {
      id: "MOBAAAC410AAA",
      gumgaOrganizations: ",",
      name: "Padrão",
      coefficient: 1,
      variationType: "FIXO",
      gumgaActive: true,
      allowDiscount: true,
      processSyncTypeEvendi: "PROCESSED"
    },
    refundGiftCard: [],
    withOutBilling: false,
    xmlDevolution: false,
    allDevolution: false,
    isExchange: false,
    totVCredICMSSN: 0,
    reversedConsignmentSale: false,
    isTransferSale: false,
    isStockReserved: false,
    reservedStockInvoiced: false,
    isAutomaticDevolution: false,
    consignmentFromSale: false,
    discountPercentage: 0,
    stockDivergence: {}
  };
}

export function bodyCreditCouponCreate(value = 200) {
  return {
    value: value,
    reason: "feito para um teste de pagamento",
    customerName: Cypress.env("clientNameComplete"),
    customerId: Cypress.env("clientId"),
    sallerName: "Cesar Baleco",
    recipientType: "CLIENT"
  };
}

export function bodyCreateSale(actualDate = new Date()) {
  return {
    type: "br.com.mobiage.manager.domain.model.stock.Sale",
    oi: {
      value: "370208.370209.370210."
    },
    count: 1,
    subTotal: -120,
    discount: 0,
    total: -120,
    movements: [
      {
        type: "br.com.mobiage.manager.domain.model.stock.SaleItem",
        id: 977560325,
        oi: {
          value: "370208.370209.370210."
        },
        barCode: {
          id: "3EE7FEF961B420FEE6540675F883E4B7",
          oi: {
            value: "370208.370209.370559."
          },
          gumgaOrganizations: ",B370208.MO,",
          gumgaUsers: ",",
          internalCode: "7112170000049",
          barCode: "7112320364847",
          lowStock: 1,
          active: true,
          integrationId: "2",
          codeBarType: "OWN",
          priceSheets: [
            {
              id: "3EE7FEF961B421DBD3D50675F883E4B7",
              oi: {
                value: "370208.370209.370559."
              },
              gumgaOrganizations: ",B370208.MO,",
              gumgaUsers: ",",
              name: "Padrão",
              saleValue: 120,
              costValue: 0.85,
              profit: 140.18,
              dateCreated: "2026-02-09T16:04:44Z",
              dateActivated: "2026-02-09T16:04:44Z",
              dateFinal: "3950-02-09T16:04:44Z",
              active: true,
              tableVariation: "NORMAL",
              priceSheetType: {
                id: "MOBAAAC410AAA",
                gumgaOrganizations: ",",
                name: "Padrão",
                coefficient: 1,
                variationType: "FIXO",
                gumgaActive: true,
                allowDiscount: true,
                processSyncTypeEvendi: "PROCESSED"
              },
              barcodeId: "3EE7FEF961B420FEE6540675F883E4B7",
              shareRule: "MYBASE",
              commissionPercentage: 0,
              productitemId: "3EE7FEF9618D151A43830675F883E4B7"
            }
          ],
          measureUnit: "UN",
          whoAmI: "ORGANIZATION"
        },
        item: {
          id: 977550180,
          oi: {
            value: "370208.370209.370210."
          },
          version: 0,
          count: 1005,
          countTransference: 0,
          item: {
            id: "3EE7FEF9618D151A43830675F883E4B7",
            oi: {
              value: "370208.370209.370559."
            },
            gumgaOrganizations: ",B370208.MO,",
            gumgaUsers: ",",
            name: "Camisa Galactus",
            active: true,
            integrationId: "2",
            measureUnit: "UN",
            productItemBarCodes: [
              {
                id: "3EE7FEF961B420FEE6540675F883E4B7",
                oi: {
                  value: "370208.370209.370559."
                },
                gumgaOrganizations: ",B370208.MO,",
                gumgaUsers: ",",
                internalCode: "7112170000049",
                barCode: "7112320364847",
                lowStock: 1,
                active: true,
                integrationId: "2",
                codeBarType: "OWN",
                priceSheets: [
                  {
                    id: "3EE7FEF961B421DBD3D50675F883E4B7",
                    oi: {
                      value: "370208.370209.370559."
                    },
                    gumgaOrganizations: ",B370208.MO,",
                    gumgaUsers: ",",
                    name: "Padrão",
                    saleValue: 120,
                    costValue: 0.85,
                    profit: 140.18,
                    dateCreated: "2026-02-09T16:04:44Z",
                    dateActivated: "2026-02-09T16:04:44Z",
                    dateFinal: "3950-02-09T16:04:44Z",
                    active: true,
                    tableVariation: "NORMAL",
                    priceSheetType: {
                      id: "MOBAAAC410AAA",
                      gumgaOrganizations: ",",
                      name: "Padrão",
                      coefficient: 1,
                      variationType: "FIXO",
                      gumgaActive: true,
                      allowDiscount: true,
                      processSyncTypeEvendi: "PROCESSED"
                    },
                    barcodeId: "3EE7FEF961B420FEE6540675F883E4B7",
                    shareRule: "MYBASE",
                    commissionPercentage: 0,
                    productitemId: "3EE7FEF9618D151A43830675F883E4B7"
                  }
                ],
                measureUnit: "UN",
                whoAmI: "ORGANIZATION"
              }
            ],
            files: [],
            details: [
              {
                id: "3700D5685570B09EF2A6026A0E133CE0",
                gumgaActive: true,
                version: 0,
                type: "COR",
                description: "Roxo",
                value: "Roxo",
                valueRef: "#993399"
              },
              {
                id: "3700D57DA6BF00009C54026A0E133CE0",
                gumgaActive: true,
                version: 0,
                type: "TAMANHO",
                description: "Tamanho(UN-G5)",
                value: "P",
                valueRef: "2"
              }
            ],
            ignore: false,
            allowExchange: true,
            productSerialNumbers: [],
            hasIbpt: true,
            search:
              "camisa galactus 139536 teste p roxo 7112320364847 7112170000049 marvel 2",
            measuresValues: [],
            color: "Roxo",
            size: "P",
            isImportTray: false,
            shared: "MYBASE",
            isSerialNumber: false,
            reference: "139536",
            productName: "Camisa Galactus",
            productID: "3EE7FEF9618D119917690675F883E4B7",
            productTreeName: "Camisa",
            productTreeId: "3700D5680247A0ABDC60026A0E133CE0",
            seqReference: "2",
            collection: {
              id: "3EE7FEF961B4382F39D90675F883E4B7",
              oi: {
                value: "370208.370209.370559."
              },
              gumgaOrganizations: ",null,",
              gumgaUsers: ",",
              name: "Teste"
            },
            productFiscalGroup: {
              id: 977550171,
              oi: {
                value: "370208.370209.370559."
              },
              gumgaOrganizations: ",",
              gumgaUsers: ",",
              commodityOrigin: "NACIONAL",
              vlIpi: 0,
              vlPis: 0,
              vlCofins: 0,
              ncm: {
                id: 3100,
                version: 1,
                descricao: "CAMISAS BLUSAS D/LÃ OU PÊLOS FINOS, USO FEM.",
                codigo: "62062000",
                tipo: "Ncm",
                validityStart: "2016-01-01",
                category: "VESTUÁRIO E SEUS ACESSÓRIOS, EXCETO DE MALHA",
                controlType: "UNID"
              },
              group: {
                id: 148,
                gumgaOrganizations: ",",
                gumgaUsers: ",",
                version: 2,
                name: "Grupo de produto fiscal padrão",
                description: "Grupo de produto fiscal padrão",
                active: true,
                shareRule: "MYSELF",
                commodityOrigin: "NACIONAL",
                vlIpi: 0,
                vlPis: 0,
                vlCofins: 0,
                ncm: {
                  id: 9108,
                  version: 1,
                  descricao: "VESTUÁRIO TECIDO MALHA DE ALGODÃO",
                  codigo: "61142000",
                  tipo: "Ncm",
                  validityStart: "2016-01-01",
                  category: "VESTUÁRIO E SEUS ACESSÓRIOS, DE MALHA",
                  controlType: "UNID"
                },
                cest: {
                  id: 15281,
                  version: 0,
                  descricao:
                    "Vestuario E Seus Acessorios; Calcados/ Polainas E Artefatos Semelhantes/ E Suas Partes",
                  codigo: "2805900",
                  tipo: "Cest",
                  validityStart: "2018-01-01",
                  validityEnd: "2023-01-01"
                }
              }
            },
            productLine: "",
            productCollection: "Teste",
            productModel: "Marvel",
            productBrand: "Galactus"
          },
          controlUnit: false,
          inInventory: {
            value: false
          },
          consignmentCount: 0,
          countRemittance: 0,
          stockPlace: "LOJA",
          stockMax: 0,
          stockMin: 0,
          countReserved: 0,
          format: "UNIT"
        },
        productName: "Camisa Galactus",
        count: -1,
        movementType: -1,
        movementGroupId: 977560324,
        costValue: 0.85,
        saleValue: 120,
        soldValue: 120,
        taxedSoldValue: 120,
        taxedSaleValue: 120,
        vendors: [
          {
            type: "Individual",
            id: 977548864,
            oi: {
              value: "370208.370209.370210."
            },
            gumgaOrganizations: ",",
            gumgaUsers: ",",
            name: "Eduardo Tampelini",
            since: "2026-02-05T19:59:24Z",
            active: true,
            nickname: "",
            group: {
              id: -90013,
              gumgaOrganizations: ",",
              gumgaUsers: ",",
              version: 0,
              name: "5.PF-Pessoa Física DENTRO do Estado",
              description: "5.PF-Pessoa Física DENTRO do Estado",
              active: true,
              shareRule: "MYSELF",
              destinationIndicator: 1,
              personType: 1
            },
            isShared: true,
            naturalness: "",
            created: "2026-02-05T20:00:09Z",
            search: "eduardo tampelini 977548864",
            finalConsumerSearch: false,
            updatedAt: "2026-02-05T20:00:09Z",
            paymentTypesControl: [],
            finalConsumer: false,
            commisionPercentage: 0
          }
        ],
        unitDiscount: 0,
        promotionDiscount: 0,
        saleDiscount: 0,
        saleAddition: 0,
        unitAddition: 0,
        informedPrice: false,
        productSerialNumbers: [],
        priceSheetType: {
          id: "MOBAAAC410AAA",
          gumgaOrganizations: ",",
          name: "Padrão",
          coefficient: 1,
          variationType: "FIXO",
          gumgaActive: true,
          allowDiscount: true,
          processSyncTypeEvendi: "PROCESSED"
        },
        priceSheet: {
          id: "3EE7FEF961B421DBD3D50675F883E4B7",
          oi: {
            value: "370208.370209.370559."
          },
          gumgaOrganizations: ",B370208.MO,",
          gumgaUsers: ",",
          name: "Padrão",
          saleValue: 120,
          costValue: 0.85,
          profit: 140.18,
          dateCreated: "2026-02-09T16:04:44Z",
          dateActivated: "2026-02-09T16:04:44Z",
          dateFinal: "3950-02-09T16:04:44Z",
          active: true,
          tableVariation: "NORMAL",
          priceSheetType: {
            id: "MOBAAAC410AAA",
            gumgaOrganizations: ",",
            name: "Padrão",
            coefficient: 1,
            variationType: "FIXO",
            gumgaActive: true,
            allowDiscount: true,
            processSyncTypeEvendi: "PROCESSED"
          },
          barcodeId: "3EE7FEF961B420FEE6540675F883E4B7",
          shareRule: "MYBASE",
          commissionPercentage: 0,
          productitemId: "3EE7FEF9618D151A43830675F883E4B7"
        },
        reversedConsignmentSale: false,
        addInfoProd: "Tamanho: P Cor: roxo",
        exchangeCount: 0,
        approxTaxesFedImpValue: 28.848,
        approxTaxesFedNacValue: 16.14,
        approxTaxesEstValue: 22.8,
        approxTaxesMunValue: 0
      }
    ],
    payments: [],
    responsable: {
      type: "Individual",
      id: 977547956,
      oi: {
        value: "370208.370209.370210."
      },
      gumgaOrganizations: ",BM370208.370209.O,",
      gumgaUsers: ",",
      name: "Cypress teste",
      addressList: [
        {
          id: 977547957,
          oi: {
            value: "370208.370209.370210."
          },
          version: 0,
          address: {
            zipCode: "04.530-001",
            premisseType: "RUA",
            premisse: "RUA DOUTOR RENATO PAES DE BARROS",
            number: "1017",
            information: "EDIF CORPORATE PARK ANDAR 13",
            neighbourhood: "ITAIM BIBI",
            localization: "SãO PAULO",
            state: "",
            country: "Brasil",
            latitude: 0,
            longitude: 0,
            formalCode: ""
          },
          primary: true
        }
      ],
      active: true,
      nickname: "Cypress teste",
      group: {
        id: -90016,
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        version: 0,
        name: "6.PJ-Pessoa Jurídica FORA do Estado - ISENTO de IE",
        description: "6.PJ-Pessoa Jurídica FORA do Estado - ISENTO de IE",
        active: true,
        shareRule: "MYSELF",
        destinationIndicator: 2,
        personType: 2
      },
      isShared: true,
      shareRule: "MYGROUP",
      created: "2026-02-05T18:00:50Z",
      search: "cypress teste 977547956",
      finalConsumerSearch: false,
      updatedAt: "2026-02-05T20:08:38Z",
      paymentTypesControl: [],
      securityLogin: "cy@kigi.com",
      finalConsumer: false,
      commisionPercentage: 0
    },
    operationType: {
      id: 123769,
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      uniqueId: -10019,
      name: "Venda Simples",
      category: "SIMPLE_SALE",
      informative: false,
      movementType: -1,
      invoiceObjective: "NORMAL",
      stockPlaceDefault: "LOJA",
      isUsed: true,
      useOperationNameNf: false
    },
    movementDate: actualDate.toISOString().split(".")[0] + "Z",
    status: "OPEN",
    nfeList: [],
    targetPerson: {
      type: "Individual",
      id: 977548818,
      oi: {
        value: "370208.370209.370210."
      },
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      name: "Robertim da Silva",
      addressList: [
        {
          id: 977548819,
          oi: {
            value: "370208.370209.370210."
          },
          version: 0,
          address: {
            zipCode: "87200234",
            premisseType: "PRAÇA",
            premisse: "Praça Santos Dumont",
            number: "33",
            information: "",
            neighbourhood: "Zona 01",
            localization: "Cianorte",
            state: "PR",
            country: "Brasil",
            latitude: 0,
            longitude: 0,
            formalCode: "4105508",
            stateCode: "41",
            countryCode: "1058"
          },
          primary: true
        }
      ],
      phones: [
        {
          id: 977548820,
          oi: {
            value: "370208.370209.370210."
          },
          version: 0,
          phone: {
            value: "44997345070"
          },
          primary: true
        }
      ],
      emails: [],
      since: "2026-02-05T19:47:18Z",
      active: true,
      nickname: "",
      group: {
        id: -90013,
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        version: 0,
        name: "5.PF-Pessoa Física DENTRO do Estado",
        description: "5.PF-Pessoa Física DENTRO do Estado",
        active: true,
        shareRule: "MYSELF",
        destinationIndicator: 1,
        personType: 1
      },
      isShared: true,
      naturalness: "",
      created: "2026-02-05T19:48:26Z",
      search: "robertim da silva 01842996088 977548818 44997345070",
      finalConsumerSearch: false,
      updatedAt: "2026-02-05T19:48:26Z",
      paymentTypesControl: [],
      cpf: "01842996088",
      finalConsumer: false,
      commisionPercentage: 0
    },
    itemCount: -1,
    vendors: [
      {
        type: "Individual",
        id: 977548864,
        oi: {
          value: "370208.370209.370210."
        },
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        name: "Eduardo Tampelini",
        since: "2026-02-05T19:59:24Z",
        active: true,
        nickname: "",
        group: {
          id: -90013,
          gumgaOrganizations: ",",
          gumgaUsers: ",",
          version: 0,
          name: "5.PF-Pessoa Física DENTRO do Estado",
          description: "5.PF-Pessoa Física DENTRO do Estado",
          active: true,
          shareRule: "MYSELF",
          destinationIndicator: 1,
          personType: 1
        },
        isShared: true,
        naturalness: "",
        created: "2026-02-05T20:00:09Z",
        search: "eduardo tampelini 977548864",
        finalConsumerSearch: false,
        updatedAt: "2026-02-05T20:00:09Z",
        paymentTypesControl: [],
        finalConsumer: false,
        commisionPercentage: 0
      }
    ],
    valueDiscount: 0,
    percentageDiscount: 0,
    valueAddition: 0,
    addition: 0,
    saleTag: {
      id: 38,
      tagType: "PRESENTIAL",
      tag: "Loja"
    },
    presentialSale: true,
    priceSheetType: {
      id: "MOBAAAC410AAA",
      gumgaOrganizations: ",",
      name: "Padrão",
      coefficient: 1,
      variationType: "FIXO",
      gumgaActive: true,
      allowDiscount: true,
      processSyncTypeEvendi: "PROCESSED"
    },
    withOutBilling: false,
    xmlDevolution: false,
    allDevolution: false,
    isExchange: false,
    nfeKeyDevolutionList: [],
    evendiCoupons: [],
    totVCredICMSSN: 0,
    reversedConsignmentSale: false,
    isTransferSale: false,
    isStockReserved: false,
    reservedStockInvoiced: false,
    isAutomaticDevolution: false,
    consignmentFromSale: false,
    address: {}
  };
}

export function bodyCreateNewProduct(nameProduct, actualDate = new Date()) {
  return {
    type: "br.com.mobiage.manager.domain.model.product.Product",
    productItems: [
      {
        hash: "411312010DB34CFD237FD0E6A02B8D37",
        details: [
          {
            id: "3700D57DA6BF00009C54026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "TAMANHO",
            subType: null,
            description: "Tamanho(UN-G5)",
            value: "P",
            valueRef: "2",
            tags: null,
            detailsBase: null
          },
          {
            id: "3700D5683DF1103DD33F026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "COR",
            subType: null,
            description: "Verde Limão",
            value: "Verde Limão",
            valueRef: "#00ff00",
            tags: null,
            detailsBase: null
          }
        ],
        active: true,
        files: [],
        productItemBarCodes: [
          {
            codeBarType: "OWN",
            hash: "36EB1E3CA4EC4ECAA9BC737CC2F134F8",
            priceSheets: [
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DA5F1F891A4F17646EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Can't Get Enough of Your Love",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DEB722D4149E80846EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Sweet Child O' Mine",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 11,
                saleValue: 120,
                priceSheetType: {
                  id: "MOBAAAC410AAA",
                  oi: null,
                  gumgaOrganizations: ",",
                  gumgaUsers: null,
                  name: "Padrão",
                  coefficient: 1,
                  defaultCents: null,
                  variationType: "FIXO",
                  priceSheetTypeBase: null,
                  hotkey: null,
                  gumgaActive: true,
                  shareRule: null,
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: null
                },
                commissionPercentage: 0
              }
            ],
            measureUnit: "UN"
          }
        ],
        stockInformationDTO: {
          stockPlaceInformations: [
            {
              placeType: "LOJA",
              organizationCode: "370208.370209.370210."
            }
          ]
        },
        measureUnit: "UN",
        name: `Camisa ${nameProduct}`,
        ignore: false,
        width: 15,
        height: 15,
        depth: 15,
        netWeight: 0.1,
        grossWeight: 0.1
      },
      {
        hash: "9EFBB03E408E6CDB3C6BD9E064BDB215",
        details: [
          {
            id: "3700D57D7C2C90EE3F71026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "TAMANHO",
            subType: null,
            description: "Tamanho(UN-G5)",
            value: "M",
            valueRef: "3",
            tags: null,
            detailsBase: null
          },
          {
            id: "3700D5683DF1103DD33F026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "COR",
            subType: null,
            description: "Verde Limão",
            value: "Verde Limão",
            valueRef: "#00ff00",
            tags: null,
            detailsBase: null
          }
        ],
        active: true,
        files: [],
        productItemBarCodes: [
          {
            codeBarType: "OWN",
            hash: "B9B61ADE50907EBB17DE0D1ABE2474C3",
            priceSheets: [
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DA5F1F891A4F17646EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Can't Get Enough of Your Love",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DEB722D4149E80846EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Sweet Child O' Mine",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 11,
                saleValue: 120,
                priceSheetType: {
                  id: "MOBAAAC410AAA",
                  oi: null,
                  gumgaOrganizations: ",",
                  gumgaUsers: null,
                  name: "Padrão",
                  coefficient: 1,
                  defaultCents: null,
                  variationType: "FIXO",
                  priceSheetTypeBase: null,
                  hotkey: null,
                  gumgaActive: true,
                  shareRule: null,
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: null
                },
                commissionPercentage: 0
              }
            ],
            measureUnit: "UN"
          }
        ],
        stockInformationDTO: {
          stockPlaceInformations: [
            {
              placeType: "LOJA",
              organizationCode: "370208.370209.370210."
            }
          ]
        },
        measureUnit: "UN",
        name: `Camisa ${nameProduct}`,
        ignore: false,
        width: 15,
        height: 15,
        depth: 15,
        netWeight: 0.1,
        grossWeight: 0.1
      },
      {
        hash: "6FCF0DC3E6F1499BA1A9D23013F317ED",
        details: [
          {
            id: "3700D57DADEAF0EBC693026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "TAMANHO",
            subType: null,
            description: "Tamanho(UN-G5)",
            value: "G",
            valueRef: "4",
            tags: null,
            detailsBase: null
          },
          {
            id: "3700D5683DF1103DD33F026A0E133CE0",
            oi: null,
            gumgaActive: true,
            version: 0,
            type: "COR",
            subType: null,
            description: "Verde Limão",
            value: "Verde Limão",
            valueRef: "#00ff00",
            tags: null,
            detailsBase: null
          }
        ],
        active: true,
        files: [],
        productItemBarCodes: [
          {
            codeBarType: "OWN",
            hash: "B18B677B1691F677E39C16773D1C1F2C",
            priceSheets: [
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DA5F1F891A4F17646EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Can't Get Enough of Your Love",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 0.2,
                saleValue: 12,
                priceSheetType: {
                  id: "3D422DEB722D4149E80846EF07061716",
                  oi: {
                    value: "370208.370209.370210."
                  },
                  gumgaOrganizations: ",B370208.MO,",
                  gumgaUsers: ",",
                  name: "Sweet Child O' Mine",
                  coefficient: 0.1,
                  defaultCents: null,
                  variationType: "VARIAVEL",
                  priceSheetTypeBase: {
                    id: "MOBAAAC410AAA",
                    oi: null,
                    gumgaOrganizations: ",",
                    gumgaUsers: null,
                    name: "Padrão",
                    coefficient: 1,
                    defaultCents: null,
                    variationType: "FIXO",
                    priceSheetTypeBase: null,
                    hotkey: null,
                    gumgaActive: true,
                    shareRule: null,
                    allowDiscount: true,
                    processSyncTypeEvendi: "PROCESSED",
                    processSyncPercentageEvendi: null
                  },
                  hotkey: "",
                  gumgaActive: true,
                  shareRule: "MYSELF",
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: 100
                }
              },
              {
                active: true,
                costValue: 10,
                profit: 11,
                saleValue: 120,
                priceSheetType: {
                  id: "MOBAAAC410AAA",
                  oi: null,
                  gumgaOrganizations: ",",
                  gumgaUsers: null,
                  name: "Padrão",
                  coefficient: 1,
                  defaultCents: null,
                  variationType: "FIXO",
                  priceSheetTypeBase: null,
                  hotkey: null,
                  gumgaActive: true,
                  shareRule: null,
                  allowDiscount: true,
                  processSyncTypeEvendi: "PROCESSED",
                  processSyncPercentageEvendi: null
                },
                commissionPercentage: 0
              }
            ],
            measureUnit: "UN"
          }
        ],
        stockInformationDTO: {
          stockPlaceInformations: [
            {
              placeType: "LOJA",
              organizationCode: "370208.370209.370210."
            }
          ]
        },
        measureUnit: "UN",
        name: `Camisa ${nameProduct}`,
        ignore: false,
        width: 15,
        height: 15,
        depth: 15,
        netWeight: 0.1,
        grossWeight: 0.1
      }
    ],
    active: true,
    genericCharacteristics: [],
    fiscal: {
      oi: {
        value: "100663.100664.100665."
      },
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      commodityOrigin: "NACIONAL",
      vlIpi: 0,
      vlPis: 0,
      vlCofins: 0,
      ncm: {
        id: 10072,
        oi: null,
        version: 1,
        descricao: "OUTS.BIJUTERIAS D/MET.COMUNS,PRAT.DOUR.PLAT.",
        codigo: "71171900",
        tipo: "Ncm",
        integrationId: null,
        validityStart: "2016-01-01",
        validityEnd: null,
        category:
          "PÉROLAS NATURAIS OU CULTIVADAS, PEDRAS PRECIOSAS OU SEMIPRECIOSAS E SEMELHANTES, METAIS PRECIOSOS, METAIS FOLHEADOS OU CHAPEADOS DE METAIS PRECIOSOS (PLAQUÊ), E SUAS OBRAS; BIJUTERIAS; MOEDAS",
        controlType: "UNID"
      },
      cest: {
        id: 14815,
        oi: null,
        version: 0,
        descricao: "Objetos De Vidro Para Servico De Mesa Ou De Cozinha",
        codigo: "1400100",
        tipo: "Cest",
        integrationId: null,
        validityStart: "2018-01-01",
        validityEnd: "2023-01-01",
        category: null,
        ncms: null
      },
      cBenef: null,
      group: {
        id: 962892898,
        oi: {
          value: "100663.100664.104287."
        },
        gumgaOrganizations: ",B370208.MO,",
        gumgaUsers: ",",
        version: 2,
        name: "Hello World",
        description: "Heyoooo",
        active: true,
        integrationId: null,
        shareRule: "MYSELF",
        commodityOrigin: null,
        vlIpi: null,
        vlPis: null,
        vlCofins: null,
        ncm: null,
        cest: null
      },
      productTreeFiscalSuggestedId: "3C44F0A6237221996CA6A25A5FA99647"
    },
    date: actualDate.toISOString().split(".")[0] + "Z",
    brand: {
      id: 961311324,
      oi: {
        value: "100663.100664.100665."
      },
      gumgaOrganizations: ",B100663.MO,",
      gumgaUsers: ",",
      version: null,
      name: "King Crimson",
      integrationId: null
    },
    enableCustomName: false,
    name: `Camisa ${nameProduct}`,
    model: "Teste Prod",
    line: "",
    shortName: "",
    genders: [],
    tags: [],
    files: [],
    shareRule: "MYSELF",
    enableEvendiStock: true,
    productTree: {
      id: "3700D5680247A0ABDC60026A0E133CE0",
      oi: null,
      gumgaOrganizations: ",",
      gumgaUsers: ",",
      version: 8636,
      name: "Camisa",
      description: "Moda/Roupas/Camisa",
      isGrid: true,
      isNutritional: false,
      integrationId: null,
      active: true,
      tree: {
        id: "3700D567FFAF905DF3D5026A0E133CE0",
        oi: null,
        gumgaOrganizations: ",",
        gumgaUsers: ",",
        version: 15,
        name: "Roupas",
        description: "Moda/Roupas",
        isGrid: true,
        isNutritional: false,
        integrationId: null,
        active: true,
        tree: {
          id: "3769C64F033F205F4F6CEEAF4AF026B8",
          oi: null,
          gumgaOrganizations: ",",
          gumgaUsers: ",",
          version: 18,
          name: "Moda",
          description: "Moda",
          isGrid: true,
          isNutritional: false,
          integrationId: null,
          active: true,
          tree: null,
          productTreeGroup: "MODA",
          allowExchange: true,
          productTreeSupplierId: null,
          cnpjXmlEntry: null,
          fields: [],
          codeBarType: null,
          treeType: null,
          isPublic: false,
          isSerialNumber: false,
          productTreeMeasures: null,
          imageMeasuresUrl: null,
          shareRule: "MYSELF"
        },
        productTreeGroup: "MODA_ROUPAS",
        allowExchange: true,
        productTreeSupplierId: null,
        cnpjXmlEntry: null,
        fields: [],
        codeBarType: null,
        treeType: null,
        isPublic: false,
        isSerialNumber: false,
        productTreeMeasures: null,
        imageMeasuresUrl: null,
        shareRule: "MYSELF"
      },
      productTreeGroup: "MODA_ROUPAS",
      allowExchange: true,
      productTreeSupplierId: null,
      cnpjXmlEntry: null,
      fields: [],
      codeBarType: null,
      treeType: null,
      isPublic: false,
      isSerialNumber: false,
      productTreeMeasures: [
        {
          id: "39BD85ACC159C41320090AFC532B8084",
          oi: null,
          name: "Altura",
          sequence: 0
        },
        {
          id: "39B26C79B36744E958A21A34CD6D5F75",
          oi: null,
          name: "Largura",
          sequence: 1
        }
      ],
      imageMeasuresUrl:
        "https://firebasestorage.googleapis.com/v0/b/app-kigi.appspot.com/o/bb57c644-34c0-29f5-8f07-f42edd92aab0?alt=media",
      shareRule: "MYSELF"
    },
    isGrid: true,
    format: "GRID",
    updatedAt: actualDate.toISOString().split(".")[0] + "Z",
    suppliers: [],
    trayIntegration: {
      enable: false
    }
  };
}
