# 📄 Documentação de Testes Automatizados – Cypress

Este documento tem como objetivo registrar o funcionamento dos testes automatizados, abordando desde a instalação até a execução.

**Ferramenta utilizada:** Cypress `v13.6.6`

---

## 📂 Estrutura do Projeto

Toda a automação está organizada na pasta `cypress`, que contém as seguintes estruturas principais:

### **1️⃣ Estrutura de Testes**
- **`e2e/`** – Contém os cenários de teste automatizados a serem executados.  
- **`fixtures/`** – Armazena arquivos externos usados como massa de dados nos testes.

### **2️⃣ Estrutura de Captura de Erros e Regressão Visual**
- **`snapshot/`** – Diretório para armazenar capturas de tela.  
  - **`snapshot/actual/`** – Screenshots de erros gerados durante execução em modo *headless*.  
  - **`snapshot/base/`** – Screenshots de referência utilizadas na validação de testes de regressão visual.

### **3️⃣ Estrutura de Suporte**
- **`support/`** – Contém scripts de apoio e organização das páginas.  
  - **Estrutura de páginas (Page Objects)**:  
    Cada subpasta representa um módulo do sistema, organizada da seguinte forma:  
    - **`page/`** – Scripts que definem interações (ex.: cliques, preenchimentos de campos).  
    - **`elements/`** – Mapeamento de elementos da interface (botões, inputs, labels).  

  **Módulos existentes:**
  - `Budget/` – Orçamento  
  - `Cashier/` – Caixa e movimentações (suplemento e sangria)  
  - `Client/` – Cadastro de cliente  
  - `Consignment/` – Consignado  
  - `Coupon/` – Cupom  
  - `Devolution/` – Devolução  
  - `E-commerce/` – E-commerce  
  - `Exchange/` – Troca  
  - `Funcionario/` – Cadastro de funcionário  
  - `Kit-Product/` – Cadastro de kits de produtos  
  - `Login/` – Login  
  - `Note/` – Notas fiscais  
  - `Payable/` – Contas a pagar  
  - `Pricesheet/` – Tabela de preços  
  - `Product/` – Cadastro de produtos  
  - `Product-Type/` – Tipos de produtos  
  - `Promotion/` – Promoções  
  - `Provider/` – Fornecedores  
  - `Receivable/` – Contas a receber  
  - `Reserved-Stock/` – Reservas de estoque  
  - `Sale/` – Vendas  
  - `Stock/` – Estoque (entrada, saída, inventário)  
  - `Utils/` – Funções utilitárias (ex.: conversão de datas, extração de números de strings)  

  **Arquivos importantes em `support/`:**
  - `commands.js` – Definição de comandos customizados.  
  - `e2e.js` – Configurações globais do projeto e importações de comandos.

### **4️⃣ Estrutura de Gravações**
- **`videos/`** – Gravações de execução dos testes em modo *headless*.  

---

## ⚙️ Arquivos de Configuração (fora da pasta `cypress`)
- **`cypress.config.js`** – Configurações gerais do Cypress.  
- **`cypress.env.json`** – Armazena variáveis de ambiente utilizadas nos testes.  

---

## ▶️ Execução dos Testes

Para executar os testes, utilize os scripts abaixo:

### **Executar todos os testes com integração ao Qase**
```bash
npm run cy:run
