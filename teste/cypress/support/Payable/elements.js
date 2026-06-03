export const elements = {
  //tela de recebimento
  tabPay:
    ':nth-child(8) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(2) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabCreateEditPay:
    ':nth-child(8) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(1) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabPayments:
    ':nth-child(8) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(3) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  inputSearchPay: '.input-group-search > .ng-empty',
  checkboxChoicePay: '.charge-checkbox > .ng-scope > .label-cbx',
  selectTypeFilter: 'select[ng-model="$ctrl.searchType"]',
  //Parte pagamento
  btnAddPaymentMoney: '.payment-money-button',
  btnAddPaymentCheckingAccount: '.payment-checking-account-button',
  btnAddPaymentCheckThird: '.payment-check-button',
  btnAddPaymentTreasuryAccount: '.payment-treasury-button',
  btnAddPaymentCheck: ':nth-child(4) > .col-md-12 > .payment-check-button',
  btnAddPaymentCard: '.step-two > .m-t-14 > .col-md-12 > .payment-card-button',
  btnPaymentMoney: '.payment-type-wrapper > :nth-child(2)',
  btnPaymentCard: '.payment-type-wrapper > :nth-child(3)',
  btnPaymentCheckingAccount: '.payment-type-wrapper > :nth-child(7)',
  btnPaymentCheckThird: '.payment-type-wrapper > :nth-child(6)',
  btnPaymentCheck: '.payment-type-wrapper > :nth-child(4)',
  btnPaymentTreasuryAccount: '.payment-type-wrapper > :nth-child(9)',
  btnPaymentCoupon: '.payment-type-wrapper > :nth-child(8)',
  checkboxCoupon: ':nth-child(1) > [ng-if="$ctrl.checkbox && !$row.isAdicional"]',
  btnAddPaymentCoupon: '.payment-cupons-button',
  inputPaymentMoney: '.mbg-input-money-wrapper > .ng-pristine',
  selectCheckThird: '.col-md-12 > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputCheckThird: '.mbg-select-list.active > .mbg-select-search-wrapper',
  inputAgencyCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(1) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  selectAccountCheck: '.col-md-12 > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputNumberCheck: '#documentNumber > .mbg-input-wrapper > .ng-pristine',
  btnConfirmCheck: '.bt-next > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  inputNumberParcelsCheckCard: '.mbg-input-number-wrapper > .ng-pristine',
  selectExpirationCheck: '.col-md-5 > .ng-untouched > .mbg-select-wrapper > .fa-caret-down',
  btnContinueCheck: ':nth-child(3) > .col-md-12 > .payment-check-button',
  selectAccount: '.checking-account > .mbg-select-wrapper > .fa-caret-down',
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
  inputValueParcels:
    ':nth-child(4) > .parcels-title-item > :nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-pristine',
  vlrPay: '.col-md-12 > :nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-valid',
  btnOptionsPay:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option > svg',
  btnEditPay:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(6) > a',
  inputEditQuantity: '.mbg-input-number-wrapper > .ng-pristine',
  inputEditTotalValue:
    ':nth-child(4) > .enable-enter > .mbg-input-money-wrapper > .ng-pristine > .ng-pristine',
  inputEditExpiration: ':nth-child(4) > .enable-enter > .mbg-input-wrapper > .input-with-calendar',
  btnEraseCategory: 'button > .fa',
  btnPaymentPreview:
    ':nth-child(1) > .actions > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(5) > a',
  msgChargeback: '.mb-n-inside-container',
  inputMotiveChargeback: '.mbg-input-wrapper > .ng-pristine',
  btnOptionDelete: ':nth-child(7) > a',
  //parte recegociacao
  btnChangeTab: '.mb-smqm-button-arrow-container',
  btnShowItens:
    ':nth-child(4) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-seemore',
  tabReparceling:
    ':nth-child(4) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(4) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  checkboxSelectTitle: '.charge-checkbox > .ng-scope',
  btnReparceling: '.m-t-b-44 > .col-md-12 > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  btnConfirmReparceling: '.mbg-btn-form-wrapper > button',
  //parte de validação
  valueCreditCard:
    ':nth-child(7) > .check-entrys-account-header > .check-entrys-account-metadata > label.ng-binding > .ng-binding',
  valueDebitCard:
    ':nth-child(8) > .check-entrys-account-header > .check-entrys-account-metadata > label.ng-binding > .ng-binding',
  tabCashier: '.caixa-aberto',
}
