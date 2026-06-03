const el = require('./elements').elements
const elProvider = require('../Provider/elements').elements
import justNumbers from '../Utils/utils'
//Os wait que estão antes de uma api é porque a api é chamada duas vezes ou ela é chamada mas o front não acompanha e foi adicionado um wait de 2 segundos
class Stock {
  StartReceipt() {
    cy.get(el.tabReceipt).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/discount-coupon/get-credit-coupon-customer/*`).as('loadPerson')
    cy.get(el.inputProvider).type(Cypress.env('provider'))
    cy.contains('span', Cypress.env('provider')).should('be.visible').click()
    cy.wait('@loadPerson',{timeout:30000})
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.get(el.btnStartReceipt).click()
    cy.wait('@loadinformation',{timeout:30000})
    cy.contains('button', ' Continuar > ').should('be.visible').click()
    cy.wait('@loadinformation',{timeout:30000})
  }
  AccessHitoricReceipt(){
    cy.get(el.tabReceipt).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/list-entry-reversal?categories=SIMPLE_ENTRY,SIMPLE_ENTRY_MATRIX,XML_ENTRY,XML_ENTRY_MATRIX&*`).as('loadReceipts')
    cy.get(el.btnHistoric).click()
    cy.wait('@loadReceipts',{timeout:65000})
  }
  AccessHitoricStockOut(){
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockOut).click()
    cy.get(el.btnHistoric).click()
    cy.wait('@informatioMovement')
  }
  ChargebackReceipt(isXML= false,havePayment = false){
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/revert-or-cry/verify/*`).as('modalChargeback')
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    if(isXML){
      cy.get(el.selectTypeOperation).children('select').select('XML')
     }else{
      cy.get(el.btnOptionHistoric).click()
      cy.contains('span','Estornar').click()
      cy.wait('@modalChargeback')
      cy.wait(2000) // Esse wait de 2 segundos é necessario pois esse modal embora ele apareça em tela as opções nele não ficam habilitadas de imediato
    }
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/movementgroup/revert-or-cry/*`).as('chargeback')
    if(isXML){ //Nota mental melhorar essa questão do estorno para testar o clique na tela para contornar esse problema que tive usei a api do kigi para o estorno
      cy.request({
        method: 'GET',
        url: `${Cypress.env('urlApi')}/api/movementgroup/list-entry-reversal?categories=SIMPLE_ENTRY,XML_ENTRY&index=0&maxResults=1&param=`,
        headers: {
            Gumgatoken: localStorage.getItem('token')
        }
      }).then((data)=>{
        const idMovimentReceipt = JSON.stringify(data.body.values[0].id)
        cy.log(idMovimentReceipt)
        cy.request({
          method: 'GET',
          url: `${Cypress.env('urlApi')}/api/movementgroup/revert-or-cry/${idMovimentReceipt}`,
          headers:{
            Gumgatoken: localStorage.getItem('token')
          },
          failOnStatusCode: false
          
        }).then((data)=>{
          if(havePayment){
            expect(data.status).be.eq(500)
          }else{
            expect(data.status).be.eq(200)
          }
        })
      })
      
    }else{
      cy.get(el.btnConfirmChargebackAndGeneratedReceipt).click()
      cy.wait('@chargeback',{timeout:30000}).then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
    }
  }
  GenerateNewReceipt(){
    cy.get(el.btnOptionHistoric).first().click()
    cy.contains('span','Gerar Movimentação').click()
    cy.wait(2000)
    cy.contains('button','Sim').first().click()
    cy.wait(2000)
    cy.wait('@loadinformation',{timeout:15000})
  }
  ChargebackStockOut(){
    cy.get(el.btnOptionHistoricStockOut).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/revert-or-cry/verify/*`).as('chargebackload')
    cy.contains('span','Estornar').click()
    cy.wait(2000)
    cy.wait('@chargebackload',{timeout:15000})
    cy.intercept('GET', `${Cypress.env('urlApi')}/api/movementgroup/doreversal/*`).as('chargeback')
    cy.contains('button','Sim').click()
    cy.wait('@chargeback',{timeout:15000}).then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  GenerateNewStockOut(){
    cy.get(el.btnOptionHistoricStockOut).click()
    cy.contains('span','Gerar Movimentação').click()
    cy.wait(3000)
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/editreversal/*`).as('generateNewMovement')
    cy.get(el.btnConfirmChargebackAndGeneratedReceipt).click()
    cy.wait('@generateNewMovement')
    cy.contains('button', ' Continuar > ').click()
    cy.wait(2000)
    cy.wait('@loadinformation',{timeout:15000})
  }
  AddProductBarcodeQuantity(barcode = [], quantity) {
    barcode.forEach((cod) => {
      cy.intercept('POST','https://*.clarity.ms/collect').as('loadInformation')
      cy.get(el.inputProduct).type(`${cod}{enter}`)
      cy.wait('@loadInformation',{timeout:15000})
      cy.get(el.inputQuantity).first().clear().type(quantity)
      cy.get(el.btnAddProduct).click()
    })
  }
  AddProductBarcode(barcode = []) {
    barcode.forEach((cod) => {
      cy.intercept('POST','https://*.clarity.ms/collect').as('loadInformation')
      cy.get(el.inputProduct).type(`${cod}{enter}`)
      cy.wait('@loadInformation',{timeout:15000})
    })
  }
  CancelInReceipt(motive = 'cancelado por teste'){
    cy.get(el.btnOptionsInMoviment).click()
    cy.get(el.btnCancelInMoviment).click()
    cy.intercept('GET',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.contains('button',' Sim ').click()
    cy.wait('@loadinformation')
    cy.get(el.inputMotiveCancel).type(motive)
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/new`).as('loadNewMoviment')
    cy.get(el.btnConfirmCancel).click()
    cy.wait('@loadNewMoviment')


  }
  SaveReceipt(){
    cy.contains('span','Opções').click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/new`).as('newMovimentLoad')
    cy.get(el.btnOptionSaveMoviment).click()
    cy.wait('@newMovimentLoad')
  }
  CancelInStockout(motive){
    cy.get(el.btnOptionsInMoviment).click()
    cy.get(el.btnCancelInMoviment).click()
    cy.wait(3000)
    cy.contains('button',' Sim ').click()
    if(motive != undefined){
      cy.get(el.inputMotiveCancel).type(motive)
    }
    cy.wait(4000)
    cy.get(el.btnConfirmCancel).click()
    cy.wait(4000)


  }
  SaveStockOut(){
    cy.get(el.btnOptionsInMoviment).click()
    cy.intercept('PUT',`${Cypress.env('urlApi')}/api/movementgroup/*`).as('saveStockOut')
    cy.get(el.btnOptionSaveMoviment).click()
    cy.wait(['@saveStockOut','@informatioMovement']).then((interceptions)=>{
      expect(interceptions[0].response.statusCode).be.eq(200)
      expect(interceptions[1].response.statusCode).be.eq(200)
    })
  }
  SaveTransferStock(){
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/stock-transfer/save-transfer/`).as('saveTransfer')
    cy.get(el.btnSaveTransferStock).click()
    cy.wait(['@saveTransfer', '@loadInformation'],{timeout:75000}).then(interception =>{
      expect(interception[0].response.statusCode).be.eq(200)
    })
  }
  CancelTranferStock() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnHistoricTransfer).click()
    cy.contains('label', 'Enviadas').click()
    cy.get(el.btnOptionTransfer).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/stock-transfer/cancel-transfer*`).as('cancel')
    cy.get(el.btnOptionCancelTransfer).click()
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.msgCancelTransfer).should('be.visible')
  }
  EditTransferStock(){
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnHistoricTransfer).click()
    cy.contains('label', 'Enviadas').click()
    cy.get(el.btnOptionTransfer).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/stock-transfer/view-transfer?idStockTransfer=*`).as('loadEditTransfer')
    cy.get(el.btnOptionEditTransfer).click()
    cy.wait(['@loadEditTransfer','@loadInformation'],{timeout:45000}).then(intercept =>{
      expect(intercept[0].response.statusCode).be.eq(200)
    })
    cy.url().should('include', '/movementv2/transfer-items')
  }
  CancelReceiptByHistoric(motive = "Cancelado por motivo teste"){
    cy.get(el.btnOptionHistoric).click()
    cy.contains('span','Cancelar').click()
    cy.wait('@loadinformation',{timeout:30000})
    cy.get(el.btnMotiveCancelByHistoric).type(motive)
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/v2/xml-entry/cancel?*`).as('cancel')
    cy.contains('button', ' Confirmar ').click()
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  CancelStockOutByHistoric(motive = "Cancelado por motivo teste"){
    cy.get(el.btnOptionHistoricStockOut).click()
    cy.contains('span','Cancelar').click()
    cy.wait(3000)
    cy.get(el.btnMotiveCancelByHistoric).type(motive)
    cy.wait(4000)
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/v2/xml-entry/cancel?*`).as('cancel')
    cy.contains('button', ' Confirmar ').click()
    cy.wait('@cancel').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  EditReceipt(){
    cy.get(el.btnOptionHistoric).click()
    cy.contains('span','Editar').click()
    cy.wait(3000)
    cy.wait('@loadinformation',{timeout:10000})
  }
  EditReceiptXML(){
    cy.get(el.btnOptionHistoric).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/v2/xml-entry/edit?movementGroupId=*`).as('waitPageEditReceipt')
    cy.contains('span','Editar').click()
    cy.wait('@waitPageEditReceipt',{timeout: 120000})
    cy.wait(3000)
    cy.get('.btn-update-list').click()
    cy.wait('@loadinformation')
  }
  EditStockOut(){
    cy.get(el.btnOptionHistoricStockOut).click()
    cy.contains('span','Editar').click()
    cy.wait('@loadinformation')
  }
  AddProductConsultQuantity(barcode = [], quantity) {
    barcode.forEach((cod) => {
      cy.intercept('POST',`${Cypress.env('urlApi')}/api/v2/product-item/terminal/v2?isComposed=true&maxResult=7&pageCurrent=0`).as('loadConsult')
      cy.get(el.btnConsultProduct).dblclick()
      cy.wait('@loadConsult',{timeout:65000})
      cy.get(el.inputConsultProduct).type(cod,{delay:0})
      cy.wait('@loadConsult',{timeout:65000})
      cy.get(el.checkboxSelectProduct).first().click()
      cy.intercept('GET',`${Cypress.env('urlApi')}/api/stockitem/searchbyproductparam*`).as('loadproduct')
      cy.contains('button', ' Concluir ').click()
      cy.wait('@loadproduct',{timeout:65000})
      cy.get(el.inputQuantity).first().clear().type(quantity)
      cy.get(el.btnAddProduct).click()
      
    })
  }
  FinishReceipt(generateTitles = false, parcels = 1, distribute = false, value) {
    if (distribute) {
      cy.get(el.checkboxDistribute).first().check({force:true}).should('be.checked')
      cy.get(el.btnFinishReceipt).click()
      cy.get(el.bntNotGenerateTitles).click()
      cy.get(el.bntClosedInvoices).click()
      cy.wait(2000)
      cy.wait('@loadinformation',{timeout:10000})
      cy.get('.table > tbody > tr.ng-scope > :nth-child(2)').invoke('text').then((vlr)=>{
        cy.get(el.inputDistribute).first().type(value)
        cy.get(el.btnFinishDistribute).click()
        if(vlr < value){
          cy.get(el.msgAlertDistribute).should('be.visible')
        }else{
          cy.intercept('POST',`${Cypress.env('urlApi')}/api/stock-transfer/movement-group/`).as('loadModalNote')
          if(generateTitles){
            cy.get(el.inputParcelsTitle).clear().type(parcels)
            cy.get(el.btnGenerateTitles).click()
          }else{
            cy.get(el.btnNotGenerateTitlesDistributes).click()
          } 
          cy.wait('@loadModalNote')
          cy.intercept('POST',`${Cypress.env('urlApi')}/api/price-sheet-type/gquery`).as('waitLoad')
          cy.get(el.btnNotSendInvoice).click()
          cy.wait('@waitLoad') 
        }
      })
      
    } else {
      cy.get(el.checkboxDistribute).first().uncheck({force:true}).should('not.be.checked')
      cy.get(el.btnFinishReceipt).click()
      if(generateTitles){
        cy.get(el.inputParcelsTitle).clear().type(parcels)
        cy.wait(3000)
        cy.get(el.btnGenerateTitles).click()
      }else{
        cy.get(el.bntNotGenerateTitles).click()
      }
      cy.intercept('POST',`${Cypress.env('urlApi')}/api/price-sheet-type/gquery`).as('waitload')
      cy.get(el.bntClosedInvoices).click()
      cy.wait('@waitload',{timeout:65000}).then(intercept =>{
        expect(intercept.response.statusCode).to.eq(200)
      })
    }
  }
  StartReceiptXML(registerProvider= false) {
    cy.get(el.tabReceipt).click()
    cy.get(el.btnOptionXMl).click()
    if(registerProvider){
      cy.get(el.SelectXMl).invoke('show').selectFile('./cypress/fixtures/nota-cadastro-fornecedor.xml')
    }else{
      cy.get(el.SelectXMl).invoke('show').selectFile('./cypress/fixtures/nota.xml')
    }
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/v2/xml-entry/send`).as('waitResponseStartReceipt')
    cy.get(el.btnContinueReceiptXML).click()
    cy.wait('@waitResponseStartReceipt',{timeout: 120000})
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.get('body').then(($body) => {
      cy.log($body.find('.mbg-confirm-alert-wrapper').length )
      if ($body.find('.mbg-confirm-alert-wrapper').length > 0) {
        cy.contains('button', ' Sim ').click()
      }
      cy.wait(3000)
      cy.get('.page-wrapper').then(pagereceipt =>{
        cy.log(pagereceipt.find('.movementv2-preview-wrapper').length)
        if (pagereceipt.find('.movementv2-preview-wrapper').length == 0) {
         
          cy.contains('button', ' Sim ').click()
        }
      })
      
    })
    cy.wait(2000)
    cy.wait('@loadinformation',{timeout:15000})
    if(registerProvider){
      cy.get(el.linkCreateNewProvider).click()
      cy.get(elProvider.btnInputIE).click()
      cy.contains('span','1 - Contribuinte ICMS').click()
      cy.get(elProvider.btnInputPersonGroup).click()
      cy.get(elProvider.inputPersonGroup).type('Padrão{enter}')
      cy.intercept('POST',`${Cypress.env('urlApi')}/api/juridica`).as('loadAfterRegister')
      cy.get(elProvider.btnSaveRegisterTabReceipt).click()
      cy.wait('@loadAfterRegister')
    }
    cy.contains('span',' Continuar > ').click()
    cy.wait(2000)//essa api do information é chamada algumas vezes esse wait impede que ele pegue a primeira vez que é chamada
    cy.wait('@loadinformation',{timeout:30000})
    cy.get(el.btnContinueForDistribution).click()
  }
  LinkProduct(isShared = false) {
    if (isShared) {
          cy.get(el.btnProductReceiptXML).click()
          cy.get(el.inputProductReceiptXML).type(Cypress.env('productShared')+'{enter}')
          cy.get('.count')
            .invoke('text')
            .then(($value) => {
              Cypress.env('qtdDistribution', justNumbers($value))
              cy.get(el.inputQuantityDistribution).clear().type(Cypress.env('qtdDistribution'))
            })
          cy.get(el.btnConclue).click()
          cy.get(el.btnEditProduct).should('not.be.visible')
    } else {
          cy.get(el.btnProductReceiptXML).click()
          cy.get(el.inputProductReceiptXML).type(Cypress.env('productNotShared')+'{enter}')
          cy.get('.count')
            .invoke('text')
            .then(($value) => {
              Cypress.env('qtdDistribution', justNumbers($value))
              cy.get(el.inputQuantityDistribution).clear().type(Cypress.env('qtdDistribution'))
            })
          cy.get(el.btnConclue).click()
          cy.get(el.btnEditProduct).should('be.visible')
    }
  }
  SaveReceiptXML(){
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/v2/xml-entry/save`).as('save')
    cy.get(el.btnSaveReceivedXML).click()
    cy.wait(['@save','@loadinformation'],{timeout: 15000}).then(interception =>{
      expect(interception[0].response.statusCode).be.eq(202)
      expect(interception[1].response.statusCode).be.eq(204)
    })
  }
  FinishReceiptXml(generateTitles = false,parcels = 1) {
    cy.contains('span',' Finalizar ').click()
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/v2/xml-entry/save`).as('saveXmlReceipt')
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/new`).as('loadNewReceipt')
    if(generateTitles){
      cy.get(el.inputParcelsTitle).clear().type(parcels)
      cy.wait(3000)
      cy.get(el.btnGenerateTitles).click()
    }else{
      cy.get(el.bntNotGenerateTitles).click()
    }
    cy.wait(['@saveXmlReceipt','@loadinformation','@loadNewReceipt'],{timeout:75000}).then((intercept)=>{
      expect(intercept[0].response.statusCode).be.equal(202)

    })
    
    cy.contains('button',' OK ').click()
    cy.wait('@loadinformation',{timeout:60000})
  }
  DistributeStock(value) {
    cy.get(el.tabReceipt).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/list-entry-reversal?*`).as('loadHistoric')
    cy.get(el.btnHistoric).click()
    cy.wait('@loadHistoric',{timeout:50000})
    cy.get(el.btnOptionHistoric).click()
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/price-sheet-type/gquery`).as('waitload')
    cy.contains('span','Distribuição entre empresas').click()
    cy.wait(['@waitload','@loadinformation'],{timeout:75000})
    cy.get('.table > tbody > tr.ng-scope > :nth-child(2)').invoke('text').then((vlr)=>{
      cy.get(el.inputDistribute).first().type(value)
      cy.log(vlr)
      cy.get(el.btnFinishDistribute).click()
      if(vlr < value){
        cy.get(el.msgAlertDistribute).should('be.visible')
      }else{
        cy.get(el.btnNotGenerateTitlesDistributes).click()
        cy.get(el.btnNotSendInvoice).click()
        cy.wait('@waitload',{timeout:75000}).then(intercept=>{
          expect(intercept.response.statusCode).be.eq(200)
        })
      }
    })
    
  }
  StartDevolution(provider = Cypress.env('provider')){
    cy.get(el.btnShowItens).click()
    cy.get(el.tabDevolution).click()
    cy.get(el.inputProvider).type(provider)
    cy.wait(3000)
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/person/*`).as('loadPerson')
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadInformation')
    cy.contains('span', provider).click()
    cy.wait(['@loadPerson','@loadInformation'],{timeout:30000})
    cy.get(el.btnStartDevolution).click()
    cy.wait(2000)
    cy.wait('@loadInformation',{timeout:30000})
    cy.contains('button', ' Continuar > ').click()
    cy.wait(2000)
    cy.wait('@loadInformation',{timeout:30000})
  }
  FinishDevolution(generateCoupons = false) {
    cy.get(el.btnFinishDevolution).click()
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/*`).as('finishDevolution')
    if(generateCoupons){
      cy.contains('button',' SIM ').click()
      cy.contains('button',' Gerar crédito ').click()
      cy.get(el.msgAlertDistribute).should('be.visible')
    }else{
      cy.contains('button',' NÃO ').click()
    }
    cy.wait('@finishDevolution')
    cy.get(el.bntClosedInvoices).click()
    
  }
  FinishDevolutionSendNfe(generateCoupons = false) {
    cy.get(el.btnFinishDevolution).click()
    if(generateCoupons){
      cy.contains('button',' SIM ').click()
      cy.contains('button',' Gerar crédito ').click()
      cy.get(el.msgAlertDistribute).should('be.visible')
    }else{
      cy.contains('button',' NÃO ').click()
    }
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.wait(8000)
  }
  StartStockOut() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockOut).click()
    cy.get(el.inputClient).type(Cypress.env('clientNameComplete'))
    cy.wait(2000)
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/person/*`).as('loadPerson')
    cy.contains('span', Cypress.env('clientNameComplete')).click()
    cy.wait('@loadPerson',{timeout:30000})
    cy.intercept('POST',`https://*.clarity.ms/collect`).as('loadinformation')
    cy.get(el.btnStartStockOut).click()
    cy.wait(2000)//Wait colocado para não pegar a primeira requisição 
    cy.wait('@loadinformation',{timeout:30000})
    cy.contains('button', ' Continuar > ').click()
    cy.wait(2000)
    cy.wait('@loadinformation',{timeout:15000})
  }
  FinishStockOut() {
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/movementgroup/*`).as('informatioMovement')
    cy.get(el.btnFinishStockOut).click()
    cy.wait('@informatioMovement').then(intercept =>{
      expect(intercept.response.statusCode).be.eq(200)
    })
    cy.get(el.bntClosedInvoices).click()
    
  }
 
  FinishStockOutSendNfe() {
    cy.get(el.btnFinishStockOut).click()
    cy.intercept('PUT', `${Cypress.env('urlApi')}/api/nfe/enviar`).as('nfe')
    cy.get(el.btnSendNfe).click()
    cy.wait('@nfe').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get(el.printInvoice).should('be.visible')
    cy.wait(8000)
  }
  StockTransfer() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnSelectBranch).click()
    cy.get(el.inputBranches).type('Teste Eduardo')
    cy.wait(3000)
    cy.get(el.optionBranches).click()
    cy.get(el.btnStartTransfer).click()
  }
  FinishStockTransfer() {
    cy.get(el.btnFinishTransfer).click()
    cy.get(el.bntNotGenerateTitles).click()
    cy.get(el.bntClosedInvoices).click()
    cy.wait('@loadInformation',{timeout:15000})
  }
  AcceptTransfer() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnHistoricTransfer).click()
    cy.get(el.filterStatus).select('Pendentes')
    cy.get(el.btnOptionTransfer).click()
    cy.get(el.btnAcceptTransfer).click()
    cy.get(el.btnFinishAcceptTransfer).click()
    cy.wait(3000)
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/stock-transfer/accept-transfer`).as('acceptTransfer')
    cy.get(el.bntNotGenerateTitles).first().click()
    cy.wait('@acceptTransfer')
  }
  RejectTransfer(motive = 'Motivo de teste') {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnHistoricTransfer).click()
    cy.get(el.filterStatus).select('Pendentes')
    cy.get(el.btnOptionTransfer).click()
    cy.get(el.btnRejectTransfer).click()
    cy.get(el.inputMotive).type(motive)
    cy.intercept('POST',`${Cypress.env('urlApi')}/api/stock-transfer/reject-transfer?idStockTransfer=*`).as('rejectTransfer')
    cy.intercept('GET',`${Cypress.env('urlApi')}/api/stock-transfer/list-transfers/v2?companyName=&origin=false&page=1&pageSize=10&status=PENDING_ACCEPT`).as('msgAlert')
    cy.get('.confirm').click()
    cy.wait(['@rejectTransfer','@msgAlert']).then(interception => {
      expect(interception[0].response.statusCode).be.eq(200)
      expect(interception[1].response.statusCode).be.eq(200)
    })
    
  }
  StartInventory(typeInventory, barcode = []) {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabInventory).click()
    cy.get(el.btnCreateInventory).click()
    cy.get(el.SelectResponsible).click()
    cy.get(el.inputResponsible).type('Eduardo Tampelini')
    cy.wait(3000)
    cy.contains('span', 'Eduardo Tampelini').click()
    if (typeInventory === 'total') {
      cy.contains('button', 'Inventário total').click()
      cy.get(el.btnContinueInventory).click()
    } else {
      cy.contains('button', 'Inventário parcial').click()
      barcode.forEach((cod) => {
        cy.get(el.selectinputProductInventory).click()
        cy.get(el.inputProductInventory).type(cod + '{enter}')
        cy.get(el.btnAddProductInventory).click()
        cy.wait(3000)
      })
      cy.get(el.btnContinueInventory).click()
    }
  }
  MakeCollect(codbarras = []) {
    cy.get('body').then(($body) => {
      cy.log($body.find('.table-responsive').length)
      if ($body.find('.table-responsive').length > 0) {
        cy.get('.new-collect > .mbg-btn-form-wrapper > button').click()
        codbarras.forEach((cod) => {
          if(Cypress.env('principalBranch').trim() === "Teste Rai"){
            cy.get(el.inputProductCollect)
              .eq(1)
              .clear()
              .type(cod + '{enter}')
            cy.wait(3000)
          }else{
            cy.get(el.inputProductCollect)
              .eq(0)
              .clear()
              .type(cod + '{enter}')
            cy.wait(3000)
          }
        })
      
        cy.contains('button', ' Continuar ').click()
        cy.get(el.btnCancelPrint).click()
      } else {
        cy.get('.col-md-12 > .ng-isolate-scope > .mbg-btn-form-wrapper > button').click()
        codbarras.forEach((cod) => {
          if(Cypress.env('principalBranch').trim() === "Teste Rai"){
          cy.get(el.inputProductCollect)
            .eq(1)
            .clear()
            .type(cod + '{enter}')
          cy.wait(3000)
          }else{
            cy.get(el.inputProductCollect)
            .eq(0)
            .clear()
            .type(cod + '{enter}')
          }
        })
        cy.contains('button', ' Continuar ').click()
        cy.get(el.btnCancelPrint).click()
      }
    })
  }
  FinishCollet() {
    cy.contains('a', ' Realizar conferência').click()
    cy.intercept('PUT',`${Cypress.env('urlApi')}/api/inventory/doMovement`).as('finishInventary')
    cy.contains('button', ' Finalizar ').click()
    cy.wait('@finishInventary')
  }
  RejectTransferByNotification(motive = 'Motivo de teste') {
    cy.get(el.btnNotifications).click()
    cy.get(el.btnRejectbyNotification).click()
    if (motive != 'Motivo de teste') {
      cy.get(el.inputMotive).type(motive)
    } else {
      cy.get(el.inputMotive).type(motive)
    }
    cy.get('.confirm').click()
    
    cy.contains('div', ' A transferência foi recusada e o motivo foi enviado ao remetente. ').should(
      'be.visible',
    )
  }
  AcceptRejectByNotifications() {
    cy.get(el.btnNotifications).click()
    cy.intercept('POST', `${Cypress.env('urlApi')}/api/stock-transfer/confirm-reject-transfer*`).as(
      'confirm',
    )
    cy.get(el.btnConfirmRejectByNotification).click()
    cy.wait('@confirm').then((interception) => {
      expect(interception.response.statusCode).to.equal(200)
    })
  }
  AcceptRejectByHistoric() {
    cy.get(el.btnShowItens).click()
    cy.get(el.tabStockTransfer).click()
    cy.get(el.btnHistoricTransfer).click()
    cy.contains('label', 'Enviadas').click()
    cy.get(el.btnOptionTransfer).click()
    cy.get(el.btnConfirmRejectByHistoric).click()
    cy.contains('div', ' Confirmado a rejeição. ').should('be.visible')
  }
}

export default new Stock()
