export const elements = {
  //tela de troca
  tabExchange:
    ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(4) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  btnInputClient: '.mbg-select-wrapper > .fa-caret-down',
  inputClient: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  btnSelectExchange: ':nth-child(1) > .content-item > .ng-isolate-scope > .label-cbx',
  inputProduct: '.input-terminal > .search-text',
  btnConsultProduct: '.btn-open-terminal',
  inputConsultProduct: '.flex > .input-terminal > .ng-empty',
  checkboxSelectProduct: '.list-cols > .col-action-select',
  checkboxCheckAll: '.checkbox > svg',
  btnInputEmployee: ':nth-child(2) > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  inputEmployee: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  btnNotReportSale: '.btn-continue-without-sale',
  inputExchangeCardPresent: '.mbg-input-wrapper > .ng-pristine',
  //tela de pagamento
  btnAddPaymentMoney: '.payment-money-button',
  btnAddPaymentDeposit: '.payment-deposit-button',
  btnAddPaymentCredit: '.payment-credit-button',
  btnAddPaymentBoleto: '.col-md-12 > .payment-boleto-button',
  btnAddPaymentCheck: ':nth-child(4) > .col-md-12 > .payment-check-button',
  btnAddPaymentCard: '.step-two > .m-t-14 > .col-md-12 > .payment-card-button',
  btnPaymentMoney: ':nth-child(2) > .col-md-12 > .payment-type-item',
  btnPaymentCard: ':nth-child(3) > .col-md-12 > .payment-type-item',
  btnPaymentDeposit: ':nth-child(4) > .col-md-12 > .payment-type-item',
  btnPaymentCredit: ':nth-child(7) > .col-md-12 > .payment-type-item',
  btnPaymentCheck: ':nth-child(8) > .col-md-12 > .payment-type-item',
  btnPaymentBoleto: ':nth-child(10) > .col-md-12 > .payment-type-item',
  inputPaymentMoney: '.mbg-input-money-wrapper > .ng-pristine',
  BankCheck: '.col-md-12 > .enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputAgencyCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(1) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputAccountCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(2) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputNumberCheck: ':nth-child(3) > .ng-isolate-scope > .mbg-input-number-wrapper > .ng-pristine',
  btnConfirmCheck: '.bt-next > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  inputNumberParcelsCheckCard: '.mbg-input-number-wrapper > .ng-pristine',
  selectExpirationCheck: '.col-md-5 > .ng-untouched > .mbg-select-wrapper > .fa-caret-down',
  btnContinueCheck: ':nth-child(3) > .col-md-12 > .payment-check-button',
  inputDayExpiration: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  selectAccount:
    '.deposit-payment > :nth-child(2) > :nth-child(1) > .ng-pristine.ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputValue: '.mbg-input-money-wrapper > .ng-pristine',
  inputQuantityParcels: '.credit-parcels > .mbg-input-number-wrapper > .ng-pristine',
  selectTerm: '.enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputExpiration: '.col-md-5 > .enable-enter > .mbg-input-number-wrapper > .ng-pristine',
  btnMoreFlags: '.more-flags',
  inputNSU: '.nsu > .mbg-input-number-wrapper > .ng-pristine',
  TotalValue: '[ng-show="$ctrl.getTotalPayment() <= $ctrl.movement.total"] > .ng-binding',
  btnBill: '.mbg-btn-form-wrapper > button',
  //parte desconto
  btnDiscount: '.labels-right > :nth-child(3) > .ng-binding',
  inputDiscount: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnConfirmDiscount: '.btn-next',
  //parte taxa de entrega
  btnFreight: '.freight',
  inputFreight: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnSaveFreight: '.btn-next',
  btnAdvancedOptions: '[ng-click="openAdvancedOptions()"]',
  vlrFreight: 'input[ng-model="entity.freight.shippingValue"]',
  //parte de nota fiscal
  btnSendNfe: '#emitirNfe',
  btnSendNfce: '#emitirNfce',
  printInvoice: '[index="1"] > .modal-dialog > .modal-content > .ma-container > .mbg-modal',
  bntClosedInvoice: '.mbg-close-modal > .fas',
  btnBackInvoice: ':nth-child(2) > .col-md-12 > .toggle-option',
  //parte devolucao
  btnGeneratesCoupons: '.mbg-btn-form-wrapper > button',
  btnReturnMoney: ':nth-child(2) > .exchange-give-back-button',
  btnComfirmReturnMoney: '.mbg-btn-form-wrapper > button',
  printCoupons: '.report-iframe',
  //Parte do hisotrico da troca
  btnOptionHistoric: ':nth-child(1) > :nth-child(10) > .flex',
  btnChargeback:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(3) > a',
  btnGenerateNewRequest:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(4) > a',
  btnSaveRequest: '[ng-click="$ctrl.saveExchangeMovement()"] > .ng-binding',
  btnReturn: '.commercial-back > .ng-binding',
  btnCancelRequest:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(5) > a',
  inputMotiveCancellation: 'fieldset > input',
  btnOptionInvoice:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(8) > a',
  btnGenerateSingleNote:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(9) > a',
  btnOptionChangeInformations:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(14) > a',
  eraseEmploy:
    '[ng-model="$ctrl.vendorModal"] > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  eraseEmployDevolution:
    '[ng-model="$ctrl.vendorDevolutionModal"] > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  btnInputEmployeDevolution:
    '[ng-model="$ctrl.vendorDevolutionModal"] > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .mbg-select-input-fake',
  btnSaveChangeInformation: '.mbg-btn-form-wrapper > button',
  btnInputEmployChangeInf:
    '[ng-model="$ctrl.vendorModal"] > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .mbg-select-input-fake > .place',
}
