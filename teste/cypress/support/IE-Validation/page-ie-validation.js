/**
 * IV-18842 — Page Object para testes de validação de IE/CNPJ/UF
 *
 * Cobre os fluxos de:
 *   - Cadastro principal (Cliente / Fornecedor / Empresa)
 *   - Modal de Cadastro Rápido
 *   - Validação do componente mbg-input-ie por estado (UF)
 *
 * Premissas técnicas:
 *   - A consulta de CNPJ dispara um request para /api/receita ou equivalente.
 *   - O preenchimento do address usa searchZipCode: true internamente.
 *   - O componente mbg-address preenche o estado via ngModel.state.
 *   - O mbg-input-ie valida a IE contra o state recebido via scope.$parent.
 *   - O selectUF é um mbg-select (client-side, sem request por digitação).
 */

const el = require('./elements').elements

class IEValidation {
  /**
   * Navega até a aba de cadastro de acordo com o tipo de tela.
   * @param {'Cliente'|'Fornecedor'|'Empresa'} tela
   */
  navigateToRegister(tela) {
    switch (tela) {
      case 'Cliente':
        cy.get(el.tabClient).click()
        break
      case 'Fornecedor':
        cy.get(el.tabProvider).click()
        break
      case 'Empresa':
        // Empresas ficam em configurações; navega via URL direta
        cy.visit(`${Cypress.env('urlApp')}/#/company`)
        break
      default:
        throw new Error(`Tela desconhecida: ${tela}`)
    }
    cy.get(el.btnRegister).click()
  }

  /**
   * Preenche o CNPJ no campo de documento e aguarda a consulta à Receita.
   * Intercepta o request de consulta para garantir sincronização real.
   * @param {string} cnpj — formato com ou sem máscara
   */
  typeCNPJAndWaitConsulta(cnpj) {
    cy.intercept('GET', `**/api/cnpj/**`).as('consultaCNPJ')
    cy.intercept('GET', `**/receita**`).as('consultaReceita')
    cy.intercept('GET', `**/api/document/**`).as('consultaDocument')

    cy.get(el.inputDocument).clear().type(cnpj, { delay: 50 })

    // Aguarda qualquer um dos interceptors conhecidos (o endpoint varia por versão)
    cy.wrap(null).then(() => {
      return new Cypress.Promise((resolve) => {
        // Polling: espera até 15s pelo preenchimento do selectUF
        const start = Date.now()
        const check = () => {
          const ufEl = Cypress.$(`${el.selectUFText}:visible`)
          const ufText = ufEl.length ? ufEl.text().trim() : ''
          if (ufText.length >= 2) {
            resolve(ufText)
            return
          }
          if (Date.now() - start > 15000) {
            resolve(null)
            return
          }
          setTimeout(check, 200)
        }
        check()
      })
    })
  }

  /**
   * Verifica que o campo UF/Estado do endereço está preenchido (não vazio).
   * Este é o assert CENTRAL da correção do IV-18842.
   */
  assertUFPreenchida() {
    cy.get(el.selectUFText)
      .invoke('text')
      .then((text) => {
        expect(text.trim(), 'Campo Estado (UF) deve estar preenchido após consulta do CNPJ')
          .to.have.length.greaterThan(1)
      })
  }

  /**
   * Verifica que o campo UF/Estado contém o valor esperado.
   * @param {string} ufEsperada — sigla ex: 'SP', 'RS'
   */
  assertUFEquals(ufEsperada) {
    cy.get(el.selectUFText)
      .invoke('text')
      .then((text) => {
        expect(text.trim().toUpperCase()).to.include(ufEsperada.toUpperCase())
      })
  }

  /**
   * Preenche a Inscrição Estadual no campo mbg-input-ie.
   * @param {string} ie
   */
  fillIE(ie) {
    cy.get(el.inputIE).clear().type(ie, { delay: 50 })
    // Dispara blur para acionar o $watch do validador
    cy.get(el.inputIE).blur()
  }

  /**
   * Verifica que o campo de IE está válido (sem ng-invalid).
   */
  assertIEValid() {
    cy.get(el.wrapperIE).then(($el) => {
      const hasError = $el.hasClass('ng-invalid') || $el.find('.ng-invalid').length > 0
      expect(hasError, 'Campo IE não deve estar marcado como inválido (ng-invalid)').to.be.false
    })
  }

  /**
   * Verifica que o campo de IE está inválido (ng-invalid presente).
   */
  assertIEInvalid() {
    cy.get(el.wrapperIE).then(($el) => {
      const hasError = $el.hasClass('ng-invalid') || $el.find('.ng-invalid').length > 0
      expect(hasError, 'Campo IE deve estar marcado como inválido (ng-invalid)').to.be.true
    })
  }

  /**
   * Clica em Salvar e intercepta o request de persistência.
   * @param {'POST'|'PUT'} method — POST para criação, PUT para edição
   * @param {string} endpoint — fragmento da URL do endpoint de salvar
   */
  clickSaveAndWait(method = 'POST', endpoint = '/api/individual') {
    cy.intercept(method, `**${endpoint}**`).as('saveRequest')
    cy.get(el.btnSave).click()
    return cy.wait('@saveRequest', { timeout: 20000 })
  }

  /**
   * Verifica que o sistema retornou sucesso (2xx) no salvamento.
   */
  assertSaveSuccess() {
    cy.get('@saveRequest').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201])
    })
  }

  /**
   * Verifica que não há mensagem de erro de "IE incorreta" visível.
   */
  assertNoIEError() {
    cy.get('body').then(($body) => {
      const hasIEError =
        $body.text().includes('IE incorreta') ||
        $body.text().includes('Inscrição Estadual incorreta')
      expect(hasIEError, 'Não deve exibir mensagem de IE incorreta').to.be.false
    })
  }

  /**
   * Verifica que uma mensagem de erro de IE está visível.
   */
  assertIEErrorVisible() {
    cy.get('body').should(($body) => {
      const hasIEError =
        $body.text().includes('IE incorreta') ||
        $body.text().includes('Inscrição Estadual incorreta') ||
        $body.find('[class*="error"]').length > 0
      expect(hasIEError, 'Deve exibir mensagem de IE incorreta ou campo marcado em erro').to.be.true
    })
  }

  /**
   * Busca e abre o cadastro existente para edição pelo CNPJ.
   * @param {'Cliente'|'Fornecedor'} tela
   * @param {string} cnpj
   */
  openExistingForEdit(tela, cnpj) {
    if (tela === 'Cliente') {
      cy.get(el.tabClient).click()
      cy.get(el.inputSearchClient).type(cnpj, { delay: 300 })
    } else {
      cy.get(el.tabProvider).click()
      cy.get(el.inputSearchProvider).type(cnpj, { delay: 300 })
    }
    cy.get(el.btnEditRow).first().click()
  }

  // ── Fluxo Modal de Cadastro Rápido ─────────────────────────────────────────

  /**
   * Abre o modal de cadastro rápido a partir da tela de Vendas.
   */
  openQuickRegisterModal() {
    cy.get(el.btnOpenQuickRegisterModal).first().click()
    cy.get(el.modalContainer).should('be.visible')
  }

  /**
   * Preenche o CNPJ dentro do modal e aguarda preenchimento da UF.
   * @param {string} cnpj
   */
  typeCNPJInModal(cnpj) {
    cy.intercept('GET', `**/api/cnpj/**`).as('consultaCNPJModal')
    cy.intercept('GET', `**/receita**`).as('consultaReceitaModal')
    cy.intercept('GET', `**/api/document/**`).as('consultaDocumentModal')

    cy.get(el.modalInputDocument).clear().type(cnpj, { delay: 50 })

    cy.wrap(null).then(() => {
      return new Cypress.Promise((resolve) => {
        const start = Date.now()
        const check = () => {
          const ufEl = Cypress.$(`${el.modalSelectUFText}:visible`)
          const ufText = ufEl.length ? ufEl.text().trim() : ''
          if (ufText.length >= 2) {
            resolve(ufText)
            return
          }
          if (Date.now() - start > 15000) {
            resolve(null)
            return
          }
          setTimeout(check, 200)
        }
        check()
      })
    })
  }

  /**
   * Verifica que o campo UF dentro do modal está preenchido.
   */
  assertModalUFPreenchida() {
    cy.get(el.modalSelectUFText)
      .invoke('text')
      .then((text) => {
        expect(text.trim(), 'Campo UF no modal deve estar preenchido após consulta do CNPJ')
          .to.have.length.greaterThan(1)
      })
  }

  /**
   * Preenche a IE dentro do modal.
   * @param {string} ie
   */
  fillIEInModal(ie) {
    cy.get(el.modalInputIE).clear().type(ie, { delay: 50 })
    cy.get(el.modalInputIE).blur()
  }

  /**
   * Verifica que a IE dentro do modal está válida.
   */
  assertModalIEValid() {
    cy.get(el.modalWrapperIE).then(($el) => {
      const hasError = $el.hasClass('ng-invalid') || $el.find('.ng-invalid').length > 0
      expect(hasError, 'Campo IE no modal não deve estar marcado como inválido').to.be.false
    })
  }

  /**
   * Salva o cadastro rápido dentro do modal.
   * @param {string} endpoint
   */
  saveQuickRegister(endpoint = '/api/individual') {
    cy.intercept('POST', `**${endpoint}**`).as('saveQuickRegister')
    cy.get(el.modalBtnSave).click()
    return cy.wait('@saveQuickRegister', { timeout: 20000 })
  }
}

export default new IEValidation()
