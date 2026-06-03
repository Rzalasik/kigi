export const elements = {
  //Tela de inicio da venda e insercao dos produtos

  tabSale:
    ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(1) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  tabSaleHistory:
    ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(2) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  eraseNameClient:
    '.mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  inputClient:
    '.mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .mbg-select-input-fake > .place',
  btnInputEmployee: ':nth-child(2) > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputEmployee: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  inputProduct: '.product-item-search-wrapper > .input-terminal > .search-text',
  btnConsultProduct: '[ng-click="$ctrl.openTerminal()"]',
  inputConsultProduct: '.flex > .input-terminal > .ng-empty',
  checkboxSelectProduct: '.list-cols > .col-action-select',
  btnConfirmSale: '.btn',
  btnPrintSale: ':nth-child(1) > :nth-child(7) > .ng-scope > svg',
  checkboxPersonAuthorized: 'div[class="checkbox"]',
  spanPersonAuthorized:
    '[ng-show="$ctrl.movement.thirdiesAuthorized && $ctrl.movement.thirdiesAuthorized.name"] > .mbg-label',
  btnOptionProduct:
    '.summary-movement-options > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option > svg',
  btnOptionDiscountInProduct:
    '.summary-movement-options > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(1) > a',
  inputPercentageDiscountInProduct: '.movement-percentage > .mbg-input-wrapper > .ng-pristine',
  btnContinueApplyDiscount: '.btn-next',
  valueTotalSaleInProduct: '.info > h3.ng-binding',
  valueProductBeforeDiscount:
    '.summary-movement-right > [ng-show="!$ctrl.showQtdGift && !$ctrl.conferenceCheck"] > .minimal-value',
  haveLimit:
    '[ng-show="$ctrl.percentage < 1 && $ctrl.discountLimit && $ctrl.percentage > $ctrl.discountLimit"]',
  valueEmploy:
    ':nth-child(2) > .ng-isolate-scope > .mbg-select-wrapper > .mbg-select-input-fake > .mbg-select-value',
  //modal de criação de cliente
  btnTypePerson: '.enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputCodAdress: '.mbg-address-wrapper > .mbg-input-wrapper > .ng-pristine',
  inputNumberAdress: '.input-number',
  btnRegisterClient: '.mbg-btn-form-wrapper > button',
  //parte da tela de fautramento
  //Parte dos pagamentos
  btnAddPaymentMoney: '.payment-money-button',
  btnAddPaymentDeposit: '.payment-deposit-button',
  btnAddPaymentCredit: '.payment-credit-button',
  btnAddPaymentBoleto: '.col-md-12 > .payment-boleto-button',
  btnAddPaymentCheck: ':nth-child(4) > .col-md-12 > .payment-check-button',
  btnAddPaymentCard: '.step-two > .m-t-14 > .col-md-12 > .payment-card-button',
  btnAddPaymentCoupons: '.payment-cupons-button',
  btnPaymentMoney: ':nth-child(2) > .col-md-12 > .payment-type-item',
  btnPaymentCard: ':nth-child(3) > .col-md-12 > .payment-type-item',
  btnPaymentDeposit: ':nth-child(5) > .col-md-12 > .payment-type-item',
  btnPaymentCredit: ':nth-child(7) > .col-md-12 > .payment-type-item',
  btnPaymentCheck: ':nth-child(8) > .col-md-12 > .payment-type-item',
  btnPaymentBoleto: ':nth-child(10) > .col-md-12 > .payment-type-item',
  btnPaymentCoupons: '.payment-type-wrapper > :nth-child(9)',
  inputPagamentoMoney: '.mbg-input-money-wrapper > .ng-pristine',
  inputTerm: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  BankCheck: '.col-md-12 > .enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputAgencyCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(1) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputAccountCheck:
    '.mbg-body-modal > :nth-child(2) > :nth-child(2) > .ng-isolate-scope > .mbg-input-wrapper > .ng-pristine',
  inputNumberCheck: ':nth-child(3) > .ng-isolate-scope > .mbg-input-number-wrapper > .ng-pristine',
  btnConfirmCheck: '.bt-next > .ng-isolate-scope > .mbg-btn-form-wrapper > button',
  inputNumberParcelsCard: '.payment-type-template #qntParcels',
  inputNumberParcelsCheck: '.mbg-input-number-wrapper > .ng-pristine',
  selectExpirationCheck: '.col-md-5 > .ng-untouched > .mbg-select-wrapper > .fa-caret-down',
  btnContinueCheck: ':nth-child(3) > .col-md-12 > .payment-check-button',
  inputDayExpiration: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  checkBoxCoupons: '.table.mbg-list-v2 tbody div[class="checkbox"]',
  selectAccount: 'mbg-select[ng-model="$ctrl.checkingAccount"] .fa-caret-down',
  inputValue: '.mbg-input-money-wrapper > .ng-pristine',
  inputQuantityParcels: '.credit-parcels > .mbg-input-number-wrapper > .ng-pristine',
  selectTerm: '.enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputExpiration: '.col-md-5 > .enable-enter > .mbg-input-number-wrapper > .ng-pristine',
  btnMoreFlags: '.more-flags',
  inputNSU: '.nsu > .mbg-input-wrapper > .ng-pristine',
  TotalValue: '[ng-show="$ctrl.getTotalPayment() <= $ctrl.movement.total"] > .ng-binding',
  bntBill: '.mbg-btn-form-wrapper > button',
  btnPaymentLater: '.row > a',
  checkboxPrintPresent: '.labels-right > .flex > .ng-isolate-scope > .label-cbx > .checkbox > svg',
  //parte etiqueta de presente
  checkboxProductPrintPresent:
    '.summary-movement-check-box > .flex > .ng-isolate-scope > .label-cbx > .checkbox > svg',
  btnPrintPresent: '.mbg-btn-form-wrapper > button',
  //parte do desconto
  btnDiscount: '.labels-right > :nth-child(3) > .ng-binding',
  inputDiscount: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnConfirmDiscount: '.btn-next',
  //parte do acrescimo
  btnAddiction: '.addition',
  inputAddiction: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnConfirmAddiction: '.btn-next',
  //parte taxa de entrega
  bntClosedInvoice: '.mbg-close-modal > .fas',
  btnFreight: '.freight',
  inputFreight: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnSaveFreight: '.btn-next',
  btnAdvancedOptions: '[ng-click="openAdvancedOptions()"]',
  vlrFreight: 'input[ng-model="entity.freight.shippingValue"]',
  //parte de nota fiscal
  btnSendNfe: '#emitirNfe',
  btnSendNfce: '#emitirNfce',
  printInvoice: '[index="1"] > .modal-dialog > .modal-content > .ma-container > .mbg-modal',
  btnBackInvoice: ':nth-child(2) > .col-md-12 > .toggle-option',
  btnInvoice: ':nth-child(1) > :nth-child(8) > .ng-scope > svg',
  //opções faturar venda
  btnHistoric: '[ng-click="$ctrl.goToHistory()"] > span',
  btnOptionHistoric:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option',
  btnChargeback:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(7) > a',
  btnConfirmChargeback: '.btn-confirm-alert > .ng-binding',
  btnGenerateNewSale:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(8) > a',
  btnSaveSale: '[ng-click="$ctrl.saveMovement( undefined, undefined, $ctrl.editTray)"]',
  btnCancelSale:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(9) > a',
  btnEditSale:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(5) > a',
  inputMotiveCancellation: 'fieldset > input',
  btnPrintCarnet:
    'div[ng-show="showPrintPaymentCard() && (pdv.showDuplicate || pdv.showPromissory || pdv.showCarnet)"] > :nth-child(1) > .row > .col-md-12 > #carne',
  btnGenerateConsignment:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(4) > a > .ng-binding',
  messageGenerateConsignment: ':nth-child(3) > .mb-n-container > .mb > .mb-n-inside-container',
  btnGenerateSingleNote:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(6) > a',
  btnBillSaleHistoric:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(1) > a',
  btnOptionPrintPresent:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(2) > a',
  numberSale: 'tbody > :nth-child(1) > :nth-child(4)',
  btnOptionAlterInformations:
    ':nth-child(1) > :nth-child(9) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(14) > a',
  eraseEmploy:
    'mbg-select-person.ng-not-empty > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  btnSaveChangeInformation: '.mbg-btn-form-wrapper > button',
}
