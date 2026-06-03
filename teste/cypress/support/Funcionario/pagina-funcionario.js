const el = require('./elements').elements

class Funcionario {
  realizarCadastroFuncionario() {
    cy.wait(15000)
    cy.get(el.abaVendedor).click({ force: true })
    cy.wait(8000)
    cy.get(el.btnCadastrar).click({ force: true })
    cy.wait(8000)
    cy.get(el.inputCpf).type('37160469062')
    cy.get(el.inputNome).type('josevaldo')
    cy.get(el.inputCepEndereco).type('87200234')
    cy.get(el.inputNumeroEndereco).type('33')
    cy.wait(8000)
    cy.get(el.btnSalvarCadastro).click({ force: true })
    cy.wait(8000)
  }

  inativarFuncionario() {
    cy.wait(15000)
    cy.get(el.abaVendedor).click({ force: true })
    cy.wait(8000)
    cy.get(el.inputPesquisa).type('josevaldo')
    cy.wait(8000)
    cy.get(el.btnOpcoes).click({ force: true })
    cy.wait(3000)
    cy.get(el.opcaoInativar).click({ force: true })
    cy.get(el.textAreaInativar).type('Teste de inativar')
    cy.contains('button', 'Salvar').click({ force: true })
    cy.wait(5000)
    cy.get(el.statusInativo).should('be.visible')
  }
}

export default new Funcionario()
