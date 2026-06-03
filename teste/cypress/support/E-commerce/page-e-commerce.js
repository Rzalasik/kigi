const el = require('./elements').elements
import justNumbers from '../Utils/utils'

class Ecommerce {
  AccesTabEcommerce() {
    cy.get(el.btnChangeTab).click()
    cy.get('body').then(($body) => {
      if ($body.find('.mb-smqm-menu').length == 0) {
        cy.get(el.btnChangeTab).click()
      }
    })
    cy.contains('div', ' E-commerce ').click({ force: true })
    cy.wait(4000)
  }
  AccesTabStore() {
    cy.get(el.btnChangeTab).click()
    cy.get('body').then(($body) => {
      if ($body.find('.mb-smqm-menu').length == 0) {
        cy.get(el.btnChangeTab).click()
      }
    })
    cy.contains('div', ' Loja ').click({ force: true })
    cy.get(el.btnChangeTab).click()
    cy.wait(4000)
  }
  EditCatalogy(search = Cypress.env('Catalogy')) {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/e-vendi/catalogs/v2/gquery`).as('catalogy')
    cy.get(el.tabCatalogy).click()
    cy.wait('@catalogy', { timeout: 30000 })
    cy.get(el.inputSearchCatalogy).type(search, { delay: 500 })
    cy.get(el.btnEditCatalogy).first().click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/e-vendi/catalogs/load-products/*`).as(
      'products',
    )
    cy.contains('button', ' Continuar ').click()
    cy.wait('@products', { timeout: 30000 })
  }
  AddProductToCatalogy(products = []) {
    products.forEach((prod) => {
      cy.get(el.btnAddProductToCatalogy).click()
      cy.get(el.inputProducts).type(prod, { delay: 800 })
      cy.wait(7000)
      cy.get(el.checkboxProduct).children().click({ multiple: true })
      cy.contains('button', ' Concluir ').click()
      cy.wait(4000)
      cy.intercept(
        'POST',
        `${Cypress.env(
          'urlApi',
        )}/api/person/advanced-filter?justActive=true&pageSize=10&phoneExists=true&start=1`,
      ).as('savecatalogy')
      cy.contains('button', ' Continuar ').click()
      cy.wait('@savecatalogy', { timeout: 30000 }).then((intercept) => {
        expect(intercept.response.statusCode).be.equal(200)
      })
    })
  }
  ValidateProductPromotionSite(searchProduct, percentage = 10) {
    cy.origin(
      Cypress.env('evendiDomain'),
      { args: { searchProduct, el, percentage } },
      ({ searchProduct, el, percentage }) => {
        cy.visit(Cypress.env('evendiSite'))
        cy.get(el.inputSearchProductSite).type(searchProduct, { delay: 400 })
        cy.get(`div[class="jsx-2255104010 flex flex-row items-center  "]`).first().click()
        cy.get(el.tagDiscountProduct).should('be.visible')
        cy.get(el.tagDiscountProduct)
          .first()
          .invoke('text')
          .then((discount) => {
            cy.log(discount)
            expect(discount).be.equal(`-${percentage}%`)
          })
      },
    )
  }
}

export default new Ecommerce()
