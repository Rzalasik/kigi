const el = require('./elements').elements

class Login {
  StartLogin({ cacheSession = true } = {}) {
    const login = () => {
      cy.visit(Cypress.env('urlLogin'))
      cy.get(el.inputEmail).eq(1).clear({force:true}).type(Cypress.env('login'),{delay:0})
      cy.get(el.inputPassword).type(Cypress.env('senha'),{delay:0})
      cy.get(el.btnContinue).click()
      cy.contains('div', Cypress.env('principalBranch')).click()
      cy.intercept('GET',`${Cypress.env('urlApi')}/api/public/auth/operations/*`).as('loadOperations')
      cy.get(el.btnJoin).click()
      cy.wait('@loadOperations',{timeout:75000})
    }
    const validate = () => {
      cy.visit(Cypress.env('urlApp'))
      cy.url().should('not.eq', Cypress.env('urlLogin'))
    }
    const options = {
      cacheAcrossSpecs: true,
      validate,
    }
    if (cacheSession) {
      cy.session([Cypress.env('login')+Cypress.env('senha')], login, options)
    } else {
      login()
    }
  }

  StartLoginMatriz() {
    cy.visit(Cypress.env('urlLogin'))
    cy.get(el.inputEmail).eq(1).clear()
    cy.get(el.inputEmail).eq(1).clear().type(Cypress.env('login'))
    cy.get(el.inputPassword).type(Cypress.env('senha'))
    cy.get(el.btnContinue).click()
    cy.contains('div', Cypress.env('secondBranch')).click()
    cy.get(el.btnJoin).click()
  }

  Logout() {
    cy.get(el.btnCompany).click({ force: true })
    cy.get(el.btnLogout).click({ force: true })
  }
  MakeLoginInvalidCredentials(){
    cy.visit(Cypress.env('urlLogin'))
    cy.get(el.inputEmail).eq(1).clear().type(Cypress.env('login'))
    cy.get(el.inputPassword).type('321321')
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/public/auth?longToken=false`).as('makeLogin')
    cy.get(el.btnContinue).click()
    cy.wait('@makeLogin',{timeout:75000}).then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(401)
    })
    cy.get(el.msgError).should('be.visible').invoke('text').should('eq',' E-mail ou senha estão incorretos. ')
  }
  MakeLoginValidCredentials(){
    cy.visit(Cypress.env('urlLogin'))
    cy.get(el.inputEmail).eq(1).clear({force:true})
    cy.get(el.inputEmail).eq(1).clear().type(Cypress.env('login'))
    cy.get(el.inputPassword).type(Cypress.env('senha'),{delay:0})
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/public/auth?longToken=false`).as('makeLogin')
    cy.get(el.btnContinue).click()
    cy.wait('@makeLogin',{timeout:75000}).then((intercept)=>{
      expect(intercept.response.statusCode).be.equal(200)
    })
    cy.get(el.msgError).should('not.be.visible')
    cy.contains('div', Cypress.env('principalBranch')).should('be.visible')
  }
}

export default new Login()
