import { LightningElement, api, track } from 'lwc';
import getTrades from '@salesforce/apex/TradeManagementController.getTrades';
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
            row = {
                'sellCurrency': result[i].Sell_Currency__c,
                'sellAmount': result[i].Sell_Amount__c,
                'buyCurrency': result[i].Buy_Currency__c,
                'buyAmount': result[i].Buy_Amount__c,
                'rate': result[i].Rate__c,
                'dateBooked': result[i].Date_Booked__c
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
        this.showDialog = true;
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
        fetch("https://api.apilayer.com/fixer/latest?symbols=" + this.sellCurrencySelected + "&base=" + this.buyCurrencySelected, requestOptions)
          .then(response => response.text())
          .then(result => resObj = result)
          .catch(error => console.log('error', error));

        //this.rateValue = resObj.rates.GBP;
        console.log(resObj);
    }

}