export const elements = {
  //tela de recebimento
  tabReceive:
    ':nth-child(9) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(2) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabCreateEditReceivable:
    ':nth-child(9) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(1) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabReceivable:
    ':nth-child(9) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(3) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  inputSearchReceive: '.input-group-search > .ng-empty',
  checkboxChoiceReceivable: '.charge-checkbox > .ng-scope > .label-cbx',
  selectTypeFilter: 'select[ng-model="$ctrl.searchType"]',
  //Parte pagamento
  btnAddPaymentMoney: '.payment-money-button',
  btnAddPaymentDeposit: '.payment-deposit-button',
  btnAddPaymentCoupons: '.payment-cupons-button',
  btnAddPaymentBoleto: '.col-md-12 > .payment-boleto-button',
  btnAddPaymentCheck: ':nth-child(4) > .col-md-12 > .payment-check-button',
  btnAddPaymentCard: '.step-two > .m-t-14 > .col-md-12 > .payment-card-button',
  btnPaymentMoney: '.payment-type-wrapper > :nth-child(2)',
  btnPaymentCard: '.payment-type-wrapper > :nth-child(3)',
  btnPaymentDeposit: '.payment-type-wrapper > :nth-child(5)',
  btnPaymentCoupons: '.payment-type-wrapper > :nth-child(8)',
  btnPaymentCheck: '.payment-type-wrapper > :nth-child(4)',
  btnPaymentBoleto: ':nth-child(9) > .col-md-12 > .payment-type-item',
  inputPaymentMoney: '.mbg-input-money-wrapper > .ng-pristine',
  BankCheck: '.col-md-12 > .enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputAgencyCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(1) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputAccountCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(2) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputNumberCheck: ':nth-child(3) > .ng-isolate-scope > .mbg-input-number-wrapper > .ng-pristine',
  btnConfirmCheck: '.bt-next > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  inputNumberParcelsCheckCard: '.payment-type-template #qntParcels',
  selectExpirationCheck: '.col-md-5 > .ng-untouched > .mbg-select-wrapper > .fa-caret-down',
  btnContinueCheck: ':nth-child(3) > .col-md-12 > .payment-check-button',
  selectAccount:
    ':nth-child(2) > :nth-child(2) > .ng-pristine.ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputValue: '.mbg-input-money-wrapper > .ng-pristine',
  inputQuantityParcels: '.credit-parcels > .mbg-input-number-wrapper > .ng-pristine',
  selectTerm: '.enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputExpiration: '.col-md-5 > .enable-enter > .mbg-input-number-wrapper > .ng-pristine',
  inputDayExpiration: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  btnMoreFlags: '.more-flags',
  inputNSU: '.nsu > .mbg-input-number-wrapper > .ng-pristine',
  bntBill: '.mbg-btn-form-wrapper > button',
  checkBoxCoupons: 'div[class="checkbox"]',
  valueCoupons: '.table > tbody > :nth-child(1) > :nth-child(4)',
  TotalValue: '[ng-show="$ctrl.getTotalPayment() <= $ctrl.paymentTitle.total"] > .ng-binding',
  //Parte desconto
  btnDiscount: ':nth-child(7) > span',
  inputDiscount: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnConfirmDiscount: '.btn-next',
  //taxa acrescimo
  btnAddition: ':nth-child(8) > span',
  inputAddition: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnSaveAddition: '.btn-next',
  btnAdvancedOptions: '[ng-click="openAdvancedOptions()"]',
  vlrFreight: 'input[ng-model="entity.freight.shippingValue"]',
  bntClosedInvoice: '.mbg-close-modal > .fas',
  //Parte de nota
  btnSendNfe: '#emitirNfe',
  btnSendNfce: '#emitirNfce',
  printInvoice: '[index="1"] > .modal-dialog > .modal-content > .ma-container > .mbg-modal',
  btnBackInvoice: ':nth-child(2) > .col-md-12 > .toggle-option',
  //tela de crie a editar
  btnConsultProduct: '[ng-click="$ctrl.openTerminal()"]',
  inputConsultProduct: '.flex > .input-terminal > .ng-empty',
  checkboxSelectProduct: '.list-cols > .col-action-select',
  btnHistoric: '[ui-sref="app.commercial.sale-history-list"] > span',
  btnOptionsHistoric:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option',
  btnChargeback:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(7) > a',
  btnConfirmChargeback: '.btn-confirm-alert > .ng-binding',
  Receipt: '.report-iframe',
  btnCreateNewReceivable: '.btn-create',
  inputNumberDocument: '.document-number > .mbg-input-wrapper > .ng-pristine',
  btnInputClient:
    '.mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputTotalValue: ':nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-pristine',
  inputQtdParcels: '.mbg-input-number-wrapper > .ng-pristine',
  inputFirstExpiration: ':nth-child(3) > .enable-enter > .mbg-input-wrapper > .input-with-calendar',
  inputClient: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  selectFinancialCategory:
    '.row.ng-scope > :nth-child(1) > .enable-enter > .mbg-select-wrapper > .mbg-select-input-fake',
  optionFinancialCategory: '.mbg-select-list.active > .ul-options ',
  inputValueFinancialCategory: '.flex-1 > .enable-enter > .mbg-input-money-wrapper > .ng-pristine',
  inputValueParcels: ':nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-pristine',
  vlrReceivable: ':nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-valid',
  btnOptionsReceivable:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option > svg',
  btnEditReceivable:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(6) > a',
  inputEditQuantity: '.mbg-input-number-wrapper > .ng-pristine',
  inputEditTotalValue:
    '.col-md-12 > :nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-pristine',
  inputEditExpiration: ':nth-child(5) > .enable-enter > .mbg-input-wrapper > .input-with-calendar',
  btnEraseCategory: 'button > .fa',
  btnPreviewReceive:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(5) > a',
  msgChargeback: '.mb-n-inside-container',
  inputMotiveChargeback: '.mbg-input-wrapper > .ng-pristine',
  btnOptionDelete: ':nth-child(7) > a',
  daysExperation: '.days-expired > .ng-binding',

  //parte recegociacao
  btnChangeTab: '.mb-smqm-button-arrow-container',
  btnShowItens:
    ':nth-child(5) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-seemore',
  tabReparceling:
    ':nth-child(5) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(5) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  checkboxSelectTitle: '.charge-checkbox > .ng-scope',
  btnReparceling: '.m-t-b-44 > .col-md-12 > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  btnConfirmReparceling: '.mbg-btn-form-wrapper > button',
  //parte de validação
  valueCreditCard:
    ':nth-child(5) > .ng-isolate-scope > .check-entrys-wrapper > .check-entrys-body > :nth-child(3) > .check-entrys-account-header > .check-entrys-account-metadata > label.ng-binding > .ng-binding',
  valueDebitCard:
    ':nth-child(5) > .ng-isolate-scope > .check-entrys-wrapper > .check-entrys-body > :nth-child(2) > .check-entrys-account-header > .check-entrys-account-metadata > label.ng-binding > .ng-binding',
  tabCashier: '.caixa-aberto',
}
