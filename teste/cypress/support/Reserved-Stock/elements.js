export const elements = {
    //tela Inical e pedido de consignado
    tabReserved: ':nth-child(2) > mb-sm-subcategory.ng-scope > [sm-sub-category=""] > .mg-smsc-container > :nth-child(3) > .ng-scope.ng-isolate-scope > .ng-isolate-scope > .link-with-icon > a.mb > .mb > .mb-smb-text',
    inputClientReserved: '.place',
    btnNewReserved: '[ng-disabled="!$ctrl.targetPerson || $ctrl.selectedItems.length > 0"]',
    btnPayment: '[ng-click="$ctrl.createInvoice()"]',
    eraseNameClient: '.mbg-select-person-wrapper > .ng-isolate-scope > .mbg-select-wrapper > .fa-times',
    inputClient: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
    btnInputEmployee: ':nth-child(2) > .ng-isolate-scope > .mbg-select-wrapper > .fa-caret-down',
    inputEmployee: '.mbg-select-list.active > .mbg-select-search-wrapper > .ng-pristine',
    inputProduct: '.input-terminal > .search-text',
    totalValue: '[ng-show="$ctrl.getTotalPayment() <= $ctrl.movement.total"] > .ng-binding',
    msgSuccess: '.mb-n-inside-container',
    btnConsultProduct: '[ng-click="$ctrl.openTerminal()"]',
    inputConsultProduct: '.flex > .input-terminal > .ng-empty',
    checkboxSelectProduct: '.list-cols > .col-action-select',
    countConsignmentPending: ':nth-child(4) > .mbg-h-c-typeone > .mbg-h-c-tone-inside-container > .mbg-h-c-tone-value > .flex > :nth-child(5)',
    checkboxReserved: ':nth-child(1) > [ng-if="$ctrl.checkbox && !$row.isAdicional"] > .ng-isolate-scope',
    btnGenerateSale: '.wrap > :nth-child(4)',
    btnGenerateConsigment: '.wrap > :nth-child(5)',
    selectTypePerson: '.select-filter > .ng-pristine',
    btnGenerateTransfer: '.wrap > :nth-child(6)',
    btnPrint: 'cp-print-icon',
    btnChargeback: 'cp-reverse-icon',
    btnConfirm: 'button[class="btn-confirm-alert mbg-btn-accept ng-binding warning"]',
    btnGenerateNewReserved: 'cp-gerar-icon',
    btnSaveReserved: '[ng-click="$ctrl.saveMovement()"] > .ng-binding',
    btnHistoricReserved: '[ng-click="$ctrl.goToHistoryList()"] > span',
    btnCancelReserved: 'cp-delete-icon',
    btnEditReserved: 'cp-edit-icon',
    inputMotiveCancel: 'fieldset > input',
    btnConfirmCancel: '.confirm',
    btnDevolutionReserved: '[ng-disabled="!$ctrl.existsFinishedReserve || !$ctrl.targetPerson || $ctrl.selectedItems.length > 0"]',




   

}