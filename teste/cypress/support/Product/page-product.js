import { faker } from '@faker-js/faker'
const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Product {
  nameRandom = `${faker.word.sample()} ${faker.word.adjective()}`
  getStock(barcode) {
    // cy.intercept('GET',`${Cypress.env('urlApi')}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`).as('loadTabProduct')
    // cy.get(el.tabProduct).click()
    // cy.wait('@loadTabProduct',{timeout: 40000})
    // cy.get(el.inputSearch).type(barcode + '{enter}',{delay:800})
    // cy.wait(3000)
    // cy.get(el.btnOption).last().click()
    // cy.get(el.btnDetails).click()
    // cy.get(el.divCurrentStock)
    //   .invoke('text')
    //   .then(($vlr) => {
    //     Cypress.env('qtdStock', justNumbers($vlr))
    //     cy.log(Cypress.env('qtdStock'))
    //   })

    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=seqReference&orderDir=desc&page=1&pageSize=9&search=${barcode}&status=all`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      cy.log(data.body.values[0].id)
      cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/v2/product/get-product-details-for-list/${
          data.body.values[0].id
        }`,
        headers: {
          Gumgatoken: localStorage.getItem('token'),
        },
      }).then((details) => {
        const estoque = details.body

        for (var i in estoque) {
          if (estoque[i].barCode == barcode) {
            Cypress.env('qtdStock', estoque[i].stock)
          }
        }
        cy.log(Cypress.env('qtdStock'))
      })
    })
  }

  ValidateStockIssue(barcode, qtd) {
    // cy.intercept('GET',`${Cypress.env('urlApi')}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`).as('loadTabProduct')
    // cy.get(el.tabProduct).click()
    // cy.wait('@loadTabProduct',{timeout: 40000})
    // cy.get(el.inputSearch).type(barcode + '{enter}',{delay:600})
    // cy.wait(3000)
    // cy.get(el.btnOption).last().click()
    // cy.get(el.btnDetails).click()
    // cy.get(el.divCurrentStock)
    //   .invoke('text')
    //   .then(($vlr) => {
    //     expect(justNumbers($vlr)).to.eq(Cypress.env('qtdStock') - qtd)
    //   })
    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=seqReference&orderDir=desc&page=1&pageSize=9&search=${barcode}&status=all`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      cy.log(data.body.values[0].id)
      cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/v2/product/get-product-details-for-list/${
          data.body.values[0].id
        }`,
        headers: {
          Gumgatoken: localStorage.getItem('token'),
        },
      }).then((details) => {
        const estoque = details.body

        for (var i in estoque) {
          if (estoque[i].barCode == barcode) {
            expect(estoque[i].stock).to.eq(Cypress.env('qtdStock') - qtd)
          }
        }
      })
    })
  }
  ValidateStockReceipt(barcode, qtd) {
    // cy.intercept('GET',`${Cypress.env('urlApi')}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`).as('loadTabProduct')
    // cy.get(el.tabProduct).click()
    // cy.wait('@loadTabProduct',{timeout: 40000})
    // cy.get(el.inputSearch).type(barcode + '{enter}',{delay:600})
    // cy.wait(3000)
    // cy.get(el.btnOption).last().click()
    // cy.get(el.btnDetails).click()
    // cy.get(el.divCurrentStock)
    //   .invoke('text')
    //   .then(($vlr) => {
    //     expect(justNumbers($vlr)).to.eq(Cypress.env('qtdStock') + qtd)
    //   })
    cy.request({
      method: 'GET',
      url: `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=seqReference&orderDir=desc&page=1&pageSize=9&search=${barcode}&status=all`,
      headers: {
        Gumgatoken: localStorage.getItem('token'),
      },
    }).then((data) => {
      cy.log(data.body.values[0].id)
      cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/v2/product/get-product-details-for-list/${
          data.body.values[0].id
        }`,
        headers: {
          Gumgatoken: localStorage.getItem('token'),
        },
      }).then((details) => {
        const estoque = details.body

        for (var i in estoque) {
          if (estoque[i].barCode == barcode) {
            expect(estoque[i].stock).to.eq(Cypress.env('qtdStock') + qtd)
          }
        }
      })
    })
  }
  MakeRegisterProduct(haveStock = false, stock = 1, cost = 1000, value = 12000) {
    this.nameRandom = `${faker.word.sample()} ${faker.word.adjective()}`
    cy.get(el.tabProduct).click()
    cy.get(el.btnRegister).click()
    cy.wait(3000)
    cy.fillMbgSelect(el.inputCategory, 'camisa')
    cy.fillMbgSelect(el.inputModel, 'Teste Prod')
    cy.fillMbgSelect(el.inputBrand, this.nameRandom)
    cy.get(el.inputCost).type(cost)
    cy.get(el.inputValue).type(value)
    cy.fillMbgSelect(el.inputUnit, 'Unidade')
    cy.get(el.btnAddSize).click()
    cy.get(el.btnSize).click()
    cy.get(el.btnSize).click()
    cy.get(el.btnSize).click()
    cy.get(el.btnAddColor).click()
    cy.get(el.btnColorBlack).click()
    if (haveStock) {
      cy.get(el.tabMatriz).click()
      cy.get(el.inputStockP).type(stock)
      cy.get(el.inputStockM).type(stock)
      cy.get(el.inputStockG).type(stock)
      cy.intercept('POST', `${Cypress.env('urlApi')}/api/v2/product?upkeepMotivation=true`).as(
        'product',
      )
      cy.contains('button', ' Salvar ').click()
      cy.wait('@product', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    } else {
      cy.intercept('POST', `${Cypress.env('urlApi')}/api/v2/product?upkeepMotivation=true`).as(
        'product',
      )
      cy.contains('a', 'Salvar').click()
      cy.wait('@product', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    }
  }
  MakeRegisterProductWithoutDetails(haveStock = false, stock = 1, cost = 1000, value = 12000) {
    this.nameRandom = `${faker.word.sample()} ${faker.word.adjective()}`
    cy.get(el.tabProduct).click()
    cy.get(el.btnRegister).click()
    cy.wait(3000)
    cy.fillMbgSelect(el.inputCategory, 'camisa')
    cy.fillMbgSelect(el.inputModel, 'Teste Prod')
    cy.fillMbgSelect(el.inputBrand, this.nameRandom)
    cy.get(el.inputCost).type(cost)
    cy.get(el.inputValue).type(value)
    cy.fillMbgSelect(el.inputUnit, 'Unidade')
    cy.get(el.checkHaveDetails).click()
    if (haveStock) {
      cy.get(el.optionShowInputStock).click()
      cy.get(el.inputStockNoDetails).type(stock)
      cy.intercept('POST', `${Cypress.env('urlApi')}/api/v2/product?upkeepMotivation=true`).as(
        'product',
      )
      cy.contains('button', ' Salvar ').click()
      cy.wait('@product', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    } else {
      cy.intercept('POST', `${Cypress.env('urlApi')}/api/v2/product?upkeepMotivation=true`).as(
        'product',
      )
      cy.contains('button', 'Salvar').click()
      cy.wait('@product', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    }
  }
  DeleteProduct(barcode = `Camisa ${this.nameRandom}`, hasMovemment = false) {
    cy.intercept(
      'GET',
      `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`,
    ).as('loadTabProduct')
    cy.get(el.tabProduct).click()
    cy.wait('@loadTabProduct', { timeout: 40000 })
    cy.get(el.inputSearch).type(barcode + '{enter}', { delay: 600 })
    cy.wait(3000)
    cy.get(el.btnOption).eq(1).click()
    cy.wait(3000)
    cy.get(el.btnOptionDelete).click()
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/v2/product/remove/*`).as('delete')
    cy.contains('button', ' Sim ').click()
    if (hasMovemment) {
      cy.wait('@delete', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(406)
        cy.get('.mbg-confirm-alert-wrapper').should('be.visible')
      })
    } else {
      cy.wait('@delete', { timeout: 15000 }).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    }
  }
  StockReceipt(barcode, qtd) {
    cy.intercept(
      'GET',
      `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`,
    ).as('loadTabProduct')
    cy.get(el.tabProduct).click()
    cy.wait('@loadTabProduct', { timeout: 40000 })
    cy.intercept(
      'GET',
      `${Cypress.env('urlApi')}/api/v2/product/new-search*search=${barcode}*`,
    ).as('searchProduct')
    cy.get(el.inputSearch).type(barcode + '{enter}', { delay: 0 })
    cy.wait('@searchProduct', { timeout: 30000 })
    cy.get(el.btnOption).last().click()
    cy.get(el.btnDetails).click()
    cy.get(el.divCurrentStock)
      .invoke('text')
      .then(($vlr) => {
        Cypress.env('qtdStock', justNumbers($vlr))
        cy.log(Cypress.env('qtdStock'))
        cy.contains('button', 'Fechar ').click()

        cy.get(el.btnEdit).click()
        cy.wait(4000)
        cy.get(el.tabMatriz).click()

        if (qtd != undefined) {
          cy.get(el.inputStockP)
            .clear()
            .type(Cypress.env('qtdStock') + qtd + '{enter}')
        }
      })
    cy.wait(3000)
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/v2/product/**`).as('updateProduct')
    cy.contains('button', 'Salvar').click()
    cy.contains('button',' Confirmar ').click()
    cy.wait('@updateProduct', { timeout: 50000 })
    //cy.contains('button', ' Cancelar ').click()
    cy.wait('@loadTabProduct', { timeout: 15000 })
  }
  RemoveItemByProduct(
    search = `Camisa ${this.nameRandom}`,
    haveMoviment = false,
    haveStock = false,
    size,
  ) {
    cy.intercept(
      'GET',
      `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`,
    ).as('loadTabProduct')
    cy.get(el.tabProduct).click()
    cy.wait('@loadTabProduct', { timeout: 40000 })
    cy.get(el.inputSearch).type(search + '{enter}', { delay: 600 })
    cy.wait(3000)
    cy.get(el.btnEdit).first().click()
    cy.get(el.tabMatriz).click()
    cy.wait(3000)
    switch (size) {
      case 'P':
        cy.get(el.btnRemoveItem).first().click({ force: true })
        if (haveStock) {
          cy.contains('div', 'Não foi possivel remover, essa variação possui estoque').should(
            'be.visible',
          )
        } else if (haveMoviment) {
          cy.contains('div', 'Não é possível remover a cor, o mesmo possui movimentações.').should(
            'be.visible',
          )
        } else {
          cy.get(el.inputStockP).should('not.be.visible')
        }
        break
      case 'M':
        cy.get(el.btnRemoveItem).eq(1).click({ force: true })
        if (haveStock) {
          cy.contains('div', 'Não foi possivel remover, essa variação possui estoque').should(
            'be.visible',
          )
        } else if (haveMoviment) {
          cy.contains('div', 'Não é possível remover a cor, o mesmo possui movimentações.').should(
            'be.visible',
          )
        } else {
          cy.get(el.inputStockM).should('not.be.visible')
        }
        break
      case 'G':
        cy.get(el.btnRemoveItem).last().click({ force: true })
        if (haveStock) {
          cy.contains('div', 'Não foi possivel remover, essa variação possui estoque').should(
            'be.visible',
          )
        } else if (haveMoviment) {
          cy.contains('div', 'Não é possível remover a cor, o mesmo possui movimentações.').should(
            'be.visible',
          )
        } else {
          cy.get(el.inputStockG).should('not.be.visible')
        }
        break
      default:
        cy.get(el.btnRemoveItem).last().click({ force: true })
        if (haveStock) {
          cy.contains('div', 'Não foi possivel remover, essa variação possui estoque').should(
            'be.visible',
          )
        } else if (haveMoviment) {
          cy.contains('div', 'Não é possível remover a cor, o mesmo possui movimentações.').should(
            'be.visible',
          )
        } else {
          cy.get(el.inputStockG).should('not.be.visible')
        }
    }
  }
  ChangeDataProductsCondiction(typeField = 'Tipo de produto', isEqual = true, value = 'Camisa') {
    cy.intercept(
      'GET',
      `${Cypress.env(
        'urlApi',
      )}/api/v2/product/new-search?format=STANDARD&isComposed=true&order=id&orderDir=desc&page=1&pageSize=9&search=&status=all`,
    ).as('loadTabProduct')
    cy.get(el.tabProduct).click()
    cy.wait('@loadTabProduct', { timeout: 40000 })
    cy.get(el.btnOptionsTabProduct).first().click()
    cy.get(el.btnOptionchangeData).click()
    cy.get(el.btnInputField).click()
    cy.get(el.inputField).type(`${typeField}{enter}`)
    cy.get(el.btnInputComparison).click()
    isEqual
      ? cy.get(el.inputField).type('igual{enter}')
      : cy.get(el.inputField).type('diferente{enter}')
    cy.get(el.btnInputValue).click()
    cy.get(el.inputField).type(`${value}{enter}`)
  }
  ChangeDataProductsApply(typeApplyField = 'Grupo fiscal', valueApply = 'padrão') {
    cy.get(el.btnInputApplyItem).click()
    cy.get(el.inputField).type(`${typeApplyField}{enter}`)
    cy.get(el.btnInputApplyValue).click()
    cy.get(el.inputField).type(`${valueApply}{enter}`, { delay: 1000 })
  }
  FinishChangeDataProducts() {
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/v2/product/change-properties-product`).as(
      'changeProperties',
    )
    cy.get(el.btnConfirmChangeData).click()
    cy.wait('@changeProperties').then((intercept) => {
      expect(intercept.response.statusCode).be.equal(200)
    })
  }
}

export default new Product()
