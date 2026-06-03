const el = require('./elements').elements
import justNumbers from '../Utils/utils'
import { getLastSegment } from '../Utils/utils'
import { faker } from '@faker-js/faker'

class Promotion {
  StartPromotion(namePromotion = faker.music.songName(), haveDateFinish = false, dateFinish) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabPromotion).click()
    cy.get(el.btnCreatePromotion).click()
    cy.get(el.inputNamePromotion).type(namePromotion)
    if (haveDateFinish) {
      cy.get(el.inputDateFinish).type(dateFinish)
    }
    cy.get(el.inputPriceSheet).type('Padrão{enter}')
    cy.wait(4000)
  }
  SelectTypePromotion(type) {
    switch (type) {
      case 1:
        cy.contains('label', ' por valor/porcentagem').click()
        break
      case 2:
        cy.contains('label', ' por X').click()
        break
      case 3:
        cy.contains('label', 'Após a unidade X pague Y pela proximas unidades').click()
        break
      case 4:
        cy.contains('label', 'Após a unidade X pague Y em todas as unidades').click()
        break
      default:
        cy.contains('label', ' por valor/porcentagem').click()
    }
  }
  AddProductBarcode(codbarras = [], percentage = 10) {
    codbarras.forEach((cod) => {
      cy.get(el.btnInputProduct).click()
      cy.get(el.inputProduct).type(cod + '{enter}', { delay: 1000 })
      cy.wait(2000)
      cy.get(el.btnAddProduct).click()
      cy.wait(3000)
      cy.get(el.inputValueProduct)
        .last()
        .invoke('val')
        .then((value) => {
          const valueProduct = justNumbers(value)
          cy.get(el.inputValueProductPromotion)
            .last()
            .type(valueProduct - valueProduct * (percentage / 100))
          cy.get(el.valuePercentageDicount)
            .last()
            .invoke('text')
            .then((valuepercentage) => {
              expect(justNumbers(valuepercentage) / 100).be.eq(percentage)
            })
        })
    })
  }
  AddProductName(nameProduct = [], percentage = 10) {
    cy.get(el.btnErasedSearchFor).click()
    cy.wait(2000)
    cy.contains('span', 'Nome').click()
    cy.wait(2000)
    nameProduct.forEach((name) => {
      cy.get(el.btnInputProduct).click()
      cy.get(el.inputProduct).type(name + '{enter}')
      cy.wait(8000)
      cy.get(el.btnAddProduct).click()
      cy.wait(3000)
      cy.get(el.inputValueProduct)
        .last()
        .invoke('val')
        .then((value) => {
          const valueProduct = justNumbers(value)
          cy.get(el.inputValueProductPromotion)
            .last()
            .type(valueProduct - valueProduct * (percentage / 100))
          cy.get(el.valuePercentageDicount)
            .last()
            .invoke('text')
            .then((valuepercentage) => {
              expect(justNumbers(valuepercentage) / 100).be.eq(percentage)
            })
        })
    })
  }
  FinishPromotion(isEdit = false) {
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/promotion`).as('promotion')
    cy.get(el.btnFinishPromotion).click()
    if (isEdit) {
      cy.intercept('POST', `${Cypress.env('urlApi')}/api/promotion/gquery`).as('promotionlist')
      cy.get(el.btnClosedModalPromotion).click()
      cy.wait('@promotionlist').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    } else {
      cy.wait('@promotion').then((interception) => {
        if (interception.response.statusCode == 500) {
          cy.contains(
            'div',
            ' Promoção possui um item com outra promoção já ativa nesse intervalo de data. ',
          ).should('be.visible')
          cy.intercept('POST', `${Cypress.env('urlApi')}/api/promotion/gquery`).as('promotionlist')
          cy.contains('button', ' Sim ').click()
          cy.wait('@promotionlist').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
          })
        } else {
          expect(interception.response.statusCode).to.equal(200)
          cy.intercept('POST', `${Cypress.env('urlApi')}/api/promotion/gquery`).as('promotionlist')
          cy.get(el.btnClosedModalPromotion).click()
          cy.wait('@promotionlist').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
          })
        }
      })
    }
  }
  DeletePromotion() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabPromotion).click()
    cy.wait(4000)
    cy.get('.promotion-list-wrapper').then(($body) => {
      cy.log($body.find('[key="2"]').length)
      if ($body.find('[key="2"]').length > 0) {
        cy.get(el.btnLastPage).click()
      }
    })
    cy.wait(4000)
    cy.get(el.btnDeletePromotion).last().click()
    cy.wait(3000)
    cy.intercept('DELETE', `${Cypress.env('urlApi')}/api/promotion/*`).as('delete')
    cy.get(el.btnConfirmDelete).click()
    cy.wait('@delete').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  EditPromotion(search) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabPromotion).click()
    cy.get(el.inputSearchPromotion).type(search, { delay: 20 })
    cy.wait(4000)
    cy.get(el.btnEditPromotion).click()
  }
  ChangeStatus(status) {
    cy.get(el.btnErasedStatusPromotion).click()
    switch (status) {
      case 'kigi':
        cy.get(el.inputStatusPromotion).type('Ativo Kigi{enter}')
        break
      case 'evendi':
        cy.get(el.inputStatusPromotion).type('Ativo E-vendi{enter}')
        break
      case 'inativo':
        cy.get(el.inputStatusPromotion).type('Inativo{enter}')
        break
      default:
        cy.get(el.inputStatusPromotion).type('Ativo{enter}')
    }
  }
  ValidateUnactivePromotion(search) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabPromotion).click()
    cy.get(el.inputSearchPromotion).type(search)
    cy.wait(4000)
    cy.get(el.statusUnactive).should('be.visible')
  }
  ValidateProductOnPromotionInSale(isEvendi = false, percentage = 10) {
    if (isEvendi) {
      cy.get(el.percentageDiscountOnSale).should('not.be.visible')
    } else {
      cy.get(el.percentageDiscountOnSale)
        .should('be.visible')
        .invoke('text')
        .then((value) => {
          expect(justNumbers(value)).to.eq(percentage * -1)
        })
    }
  }
}

export default new Promotion()
