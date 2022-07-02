import { LightningElement, api, track } from 'lwc';
import getTrades from '@salesforce/apex/TradeManagementController.getTrades';
import createNewTrade from '@salesforce/apex/TradeManagementController.createTrade';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Sell CCY', fieldName: 'sellCurrency', type: 'text'},
    { label: 'Sell Amount', fieldName: 'sellAmount' },
    { label: 'Buy CCY', fieldName: 'buyCurrency'},
    { label: 'Buy Amount', fieldName: 'buyAmount' },
    { label: 'Rate', fieldName: 'rate' },
    { label: 'Date Booked', fieldName: 'dateBooked' },
];

export default class TradeManagement extends LightningElement {

    columns = columns;
    @track data = [];
    @track emptyData = true;
    @track showDialog = false;
    @track toggleSpinner = false;
    @track rateValue;
    @track sellCurrencySelected;
    @track buyCurrencySelected;
    @track sellAmountValue;
    @track buyAmountValue;

    connectedCallback() {
        getTrades()
        .then(( result ) => {
            result.length == 0 || result == undefined ? this.emptyData = true : this.setTableRows(result);
        }).catch(error => console.log(error));
    }

    setTableRows(result) {
        var row;
        this.emptyData = false;
        for (var i = 0; i < result.length; i++) {
            var dateBookedFormated = result[i].Date_Booked__c;
            dateBookedFormated = dateBookedFormated ? dateBookedFormated.split('-')[2].substring(0, dateBookedFormated.split('-')[2].indexOf('T')) + '-' + dateBookedFormated.split('-')[1] + '-' + dateBookedFormated.split('-')[0] + '  ' + dateBookedFormated.split('T')[1].substring(0, dateBookedFormated.split('T')[1].indexOf('.')) : '';
                
            row = {
                'sellCurrency': result[i].Sell_Currency__c,
                'sellAmount': result[i].Sell_Amount__c,
                'buyCurrency': result[i].Buy_Currency__c,
                'buyAmount': result[i].Buy_Amount__c,
                'rate': result[i].Rate__c,
                'dateBooked': dateBookedFormated
            }
            this.data.push(row);
        }
    }

    closeDialog(){
        this.showDialog = false;
    }

    openDialog(){
        this.showDialog = true;
    }

    createTrade(){
        this.toggleSpinner = true;
        createNewTrade({sellCcy : this.sellCurrencySelected, sellAmnt : this.sellAmountValue, buyCcy : this.buyCurrencySelected, rate : this.rateValue })
        .then(( result ) => {
            result ? window.open("/lightning/page/home?0.source=alohaHeader", "_self") : this.showToast('ERROR', 'error', 'There was an error while saving new trade.')
            this.toggleSpinner = false;
        }).catch(error => this.showToast('ERROR', 'error', 'There was an error while saving new trade.'));
    }

    buyCurrencyHandler(event){
        this.buyCurrencySelected = event.detail.value;
        if(this.sellCurrencySelected != undefined){
            this.getRateFromApi();
        }
    }

    sellCurrencyHandler(event){
        this.sellCurrencySelected = event.detail.value;
        if(this.buyCurrencySelected != undefined){
            this.getRateFromApi();
        }
    }

    sellAmountInputHandler(event){
        this.sellAmountValue = event.detail.value;
        this.buyAmountValue = this.sellAmountValue * this.rateValue;
    }


    get options() {
        return [
            { label: 'USD', value: 'USD' },
            { label: 'GBP', value: 'GBP' },
            { label: 'EUR', value: 'EUR' },
        ];
    }
    getRateFromApi() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: {
            apiKey: '4U2N6wUrMW6xwDuGHQFHgp8ZjumDZur1',
          }
        };
        var resObj;
        fetch("https://api.apilayer.com/fixer/latest?symbols=" + this.buyCurrencySelected + "&base=" + this.sellCurrencySelected, requestOptions)
          .then(response => response.text())
          .then(result => this.calculateRates(result))
          .catch(error => console.log('error', error));
    }

    calculateRates(result) {
        var rate = result != undefined ? JSON.parse(result) : '';
        switch(this.buyCurrencySelected){
            case 'USD':
                this.rateValue = rate.rates.USD;
                break;
            case 'EUR':
                this.rateValue = rate.rates.EUR;
                break;
            case 'GBP':
                this.rateValue = rate.rates.GBP;
                break;
            default:
                this.rateValue = 0;
        }
    }

    showToast(title, variant, message) {
        this.toggleSpinner = false;
        let event;
        event = new ShowToastEvent({
            title: title,
            variant: variant,
            message: message
        });
        this.dispatchEvent(event);
    }
}