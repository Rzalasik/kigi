export const elements = {
  //tela Inical e pedido de consignado
  tabConsignment:
    ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(5) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
  btnShowItens:
    ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-seemore',
  inputClientConsigment: '.place',
  btnNewOrder: '[ng-disabled="!$ctrl.targetPerson"]',
  btnPayment: '[ng-click="$ctrl.createInvoice()"]',
  eraseNameClient:
    '.mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  inputClient: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  checkboxOptionPayment:
    'mbg-checkbox[class="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-empty"]',
  btnInputEmployee: ':nth-child(2) > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
  inputEmployee: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
  inputProduct: '.input-terminal > .search-text',
  btnContinuePayment: 'button > .ng-binding',
  btnConfirmOrder: 'button[class="btn finish"]',
  btnAddPayment: '.payment-money-button',
  bntBill: '.mbg-btn-form-wrapper > button',
  bntClosedInvoice: '.mbg-close-modal > .fas',
  totalValue: '[ng-show="$ctrl.getTotalPayment() <= $ctrl.movement.total"] > .ng-binding',
  msgSuccess: '.mb-n-inside-container',
  btnConsultProduct: '[ng-click="$ctrl.openTerminal()"]',
  inputConsultProduct: '.flex > .input-terminal > .ng-empty',
  checkboxSelectProduct: '.list-cols > .col-action-select',
  countConsignmentPending:
    ':nth-child(4) > .mbg-h-c-typeone > .mbg-h-c-tone-inside-container > .mbg-h-c-tone-value > .flex > :nth-child(5)',
  btnOptionProduct:
    '.summary-movement-options > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option > svg',
  btnOptionDiscountInProduct:
    '.summary-movement-options > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(1) > a',
  inputPercentageDiscountInProduct: '.movement-percentage > .mbg-input-wrapper > .ng-pristine',
  btnContinueApplyDiscount: '.btn-next',
  valueTotalOrderInProduct: '.info > h3.ng-binding',
  valueProductBeforeDiscount:
    '.summary-movement-right > [ng-show="!$ctrl.showQtdGift && !$ctrl.conferenceCheck"] > .minimal-value',
  haveLimit:
    '[ng-show="$ctrl.percentage < 1 && $ctrl.discountLimit && $ctrl.percentage > $ctrl.discountLimit"]',
  //parte de disconto
  btnDiscount: '.labels-right > :nth-child(3) > .ng-binding',
  inputDiscount: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnConfirmDiscount: '.btn-next',
  //parte de pagamento
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
  inputPaymentMoney: '.mbg-input-money-wrapper > .ng-pristine',
  btnPaymentCoupons: ':nth-child(9) > .col-md-12 > .payment-type-item',
  checkBoxCoupons: 'div[class="checkbox"]',
  selectAccount:
    ':nth-child(2) > :nth-child(2) > .ng-pristine.ng-isolate-scope > .mbg-select-wrapper > .mbg-select-input-fake',
  inputValue: '.mbg-input-money-wrapper > .ng-pristine',
  inputQuantityParcels: '.credit-parcels > .mbg-input-number-wrapper > .ng-pristine',
  selectTerm: '.enable-enter > .mbg-select-wrapper > .fa-caret-down',
  inputExpiration: '.col-md-5 > .enable-enter > .mbg-input-number-wrapper > .ng-pristine',
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
  btnMoreFlags: '.more-flags',
  inputNSU: '.nsu > .mbg-input-number-wrapper > .ng-pristine',
  //parte da taxa de entrega
  btnFreight: '.freight',
  inputFreight: '.movement-value > .mbg-input-money-wrapper > .ng-pristine',
  btnSaveFreight: '.btn-next',
  btnAdvancedOptions: '[ng-click="openAdvancedOptions()"]',
  vlrFreight: 'input[ng-model="entity.freight.shippingValue"]',
  //Parte nota
  btnSendNfe: '#emitirNfe',
  btnSendNfce: '#emitirNfce',
  printInvoice: '[index="1"] > .modal-dialog > .modal-content > .ma-container > .mbg-modal',
  btnBackInvoice: ':nth-child(2) > .col-md-12 > .toggle-option',
  //Parte historico
  btnOptionsHistoric: ':nth-child(1) > :nth-child(11) > .flex',
  btnChargeback:
    ':nth-child(1) > :nth-child(11) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(2) > a',
  btnConfirmChargeback: '.btn-confirm-alert > .ng-binding',
  btnGeneratedNewOrder:
    ':nth-child(1) > :nth-child(11) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(3) > a',
  btnSaveConsignment: '[ng-click="$ctrl.saveOrder()"]',
  btnCancelOrder:
    ':nth-child(1) > :nth-child(11) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(4) > a',
  inputMotiveCancel: '.mbg-input-wrapper > .ng-pristine',
  btnOpctionsPaymentConsignment: ':nth-child(1) > :nth-child(10) > .flex',
  btnChargebackPaymentConsignment:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(2) > a',
  btnGeneratedNewPayment:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > [aria-hidden="false"] > a',
  btnSavePayment: '.group-options > a',
  btnCancelPayment:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(4) > a',
  btnDevolutionByOrder:
    '[ng-disabled="!$ctrl.targetPerson || $ctrl.searching || !$ctrl.enableOperations || $ctrl.pendingOrders.length == 0"]',
  checkboxOrderDevolution: '.content-item > [ng-show="$ctrl.orderPicker"]',
  btnListOrder: '[ng-click="$ctrl.listOrders()"]',
  checkboxChoiceOrder: '.label-cbx',
  checkboxChoiceDevolution:
    'mbg-checkbox[class="ng-pristine ng-untouched ng-valid ng-isolate-scope ng-empty"]',
  btnOptionsDevolution:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .title-option > svg',
  btnChargebackDevolution:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(2) > a > .ng-binding',
  btnGeneratedNewDevolution:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > [aria-hidden="false"] > a > .ng-binding',
  btnSaveDevolution: '[ng-click="$ctrl.saveOrder()"] > .ng-binding',
  btnCancelDevolution:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(4) > a > .ng-binding',
  btnInvoice: ':nth-child(1) > :nth-child(9) > .ng-scope > svg',
  btnInvoiceOrder: ':nth-child(1) > :nth-child(10) > .ng-scope > svg',
  btnPrintCarnet:
    'div[ng-show="showPrintPaymentCard() && (pdv.showDuplicate || pdv.showPromissory || pdv.showCarnet)"] > :nth-child(1) > .row > .col-md-12 > #carne',
  btnGenerateSingleNote:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(8) > a',
  btnOptionChangeInformation:
    ':nth-child(1) > :nth-child(10) > .flex > .ng-isolate-scope > .mbg-dropdown-wrapper > .dropdown > .dropdown-menu > :nth-child(9) > a',
  eraseEmploy:
    'mbg-select-person.ng-not-empty > .mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
  btnSaveChangeInformation: '.mbg-btn-form-wrapper > button',
}
