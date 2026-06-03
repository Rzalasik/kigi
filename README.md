# kigi — Testes E2E

Suite de testes automatizados E2E para o produto **[Kigi](https://kigi.com.br)** — ERP para gestão de lojas físicas e virtuais do setor de moda.

## Stack

![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

## Estrutura

```
teste/
├── cypress/
│   ├── e2e/          # Casos de teste por módulo
│   ├── support/      # Page Objects e helpers
│   └── fixtures/     # Dados de teste
├── cypress.config.js
└── package.json
```

## Módulos cobertos

| Módulo | Arquivo |
|---|---|
| Login | `Testes-Login.cy.js` |
| Cadastro | `Testes-Cadastro.cy.js` |
| Caixa | `Testes-Caixa.cy.js` |
| Comercial | `Testes-Comercial.cy.js` |
| Estoque | `Testes-Estoque.cy.js` |
| Fiscal | `Testes-Fiscal.cy.js` |

## Como rodar

```bash
cd teste
npm install
cp cypress.env.json.example cypress.env.json
# Preencha as variáveis em cypress.env.json
npx cypress open
```

## Variáveis de ambiente

Copie `cypress.env.json.example` para `cypress.env.json` e preencha com suas credenciais de teste.
