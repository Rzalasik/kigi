/**
 * IV-18842 — Elementos para testes de validação de IE/CNPJ/UF
 *
 * Seletores mapeados para os componentes:
 *   - person-documents.ts   (tela principal Empresa/Cliente/Fornecedor)
 *   - modal-quick-register-v2.ts  (modal de cadastro rápido)
 *   - mbg-address.ts        (componente de endereço compartilhado)
 *   - mbg-input-ie          (componente de IE com validação por estado)
 *
 * ATENÇÃO: seletores baseados nos atributos DOM reais observados no codebase.
 * Atualizar se o componente mbg-address ou person-documents mudar de estrutura.
 */

export const elements = {
  // ── Navegação / Abas ──────────────────────────────────────────────────────
  tabClient:
    ':nth-child(1) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(3) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabProvider:
    ':nth-child(1) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(4) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',

  // ── Listagem ──────────────────────────────────────────────────────────────
  btnRegister: '.btn-create',
  inputSearchClient: '.input-group-search > .ng-pristine',
  inputSearchProvider: '.input-group-search > .ng-pristine',
  btnEditRow: 'cp-edit-icon',

  // ── Formulário principal (person-documents) ───────────────────────────────
  // Campo CNPJ/CPF — componente person-documents, input dentro de .enable-enter
  inputDocument:
    '.person-documents-wrapper > :nth-child(2) > :nth-child(1) > .enable-enter > .mbg-input-wrapper > input',
  inputName: '.name > .mbg-input-wrapper > .ng-pristine',
  inputFantasyName: '.col-md-12.ng-scope > .enable-enter > .mbg-input-wrapper > .ng-pristine',
  inputPhone: 'mbg-input[name="phone"] input, [name="phone"] input',

  // ── Componente de endereço (mbg-address) ──────────────────────────────────
  // CEP
  inputCep: '.mbg-address-wrapper > .mbg-input-wrapper > input',
  // Campo UF/Estado — ng-model mapeado em mbg-address como ngModel.state / address.state
  // O select de UF renderiza como um mbg-select; o fake input exibe o estado selecionado
  selectUF: 'mbg-address .mbg-select-input-fake',
  // Texto visível dentro do fake input do mbg-select de UF
  selectUFText: 'mbg-address .mbg-select-input-fake .place',
  // Número do endereço
  inputAddressNumber: '.input-number',

  // ── Componente de IE (mbg-input-ie) ──────────────────────────────────────
  // Input de IE — pode ser o input com mbg-mask-ie (estados especiais) ou sem
  inputIE: 'mbg-input-ie input',
  // Wrapper de IE — para verificar classe ng-invalid (campo vermelho)
  wrapperIE: 'mbg-input-ie',
  // Classe que o AngularJS adiciona ao campo quando há erro de validação
  invalidClass: 'ng-invalid',

  // ── Botão salvar ──────────────────────────────────────────────────────────
  btnSave: '.mbg-btn-form-wrapper > button',
  btnSaveAlt: '#id-save-customer-registration',

  // ── Mensagens de erro / alerta ────────────────────────────────────────────
  // Toast ou mensagem inline de erro genérica
  toastError: '.mbg-toast-error, .alert-danger, [class*="toast"][class*="error"]',
  // Mensagem específica de IE incorreta (texto exibido pelo validador)
  msgIEIncorreta: ':contains("IE incorreta"), :contains("Inscrição Estadual incorreta")',

  // ── Modal de Cadastro Rápido (modal-quick-register-v2) ───────────────────
  // Trigger de abertura do modal no fluxo de Venda
  btnOpenQuickRegisterModal:
    '[ng-click*="quickRegister"], [class*="quick-register"], button:contains("Novo Cliente")',
  // Dentro do modal — mesmo componente person-documents mas dentro de .modal
  modalContainer: '.modal-quick-register, [class*="quick-register"]',
  modalInputDocument:
    '.modal .person-documents-wrapper > :nth-child(2) > :nth-child(1) > .enable-enter > .mbg-input-wrapper > input',
  modalSelectUF: '.modal mbg-address .mbg-select-input-fake',
  modalSelectUFText: '.modal mbg-address .mbg-select-input-fake .place',
  modalInputIE: '.modal mbg-input-ie input',
  modalWrapperIE: '.modal mbg-input-ie',
  modalBtnSave: '.modal .mbg-btn-form-wrapper > button, .modal #id-save-customer-registration',
}
