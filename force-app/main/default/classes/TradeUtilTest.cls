/*
* @author: jmruizperez1999@gmail.com
* @date: 01/07/2021
* @class: TradeUtilTest
*/
@isTest
public class TradeUtilTest {
    @testSetup static void setup() {
        Trade__c trade = new Trade__c();
        trade.Buy_Currency__c = 'USD';
        trade.Rate__c = 1.2323;
        trade.Sell_Amount__c = 500.12;
        trade.Sell_Currency__c = 'GBP';
        insert trade;
    }
    @isTest
    static void testGetAllRecordsByFieldsNull(){
        System.assertEquals(1, TradeUtil.getAllRecordsByFields(null).size());
    }
    @isTest
    static void testGetAllRecordsByFields(){
        System.assertEquals(1, TradeUtil.getAllRecordsByFields(new List<String>{
            'Sell_Currency__c', 
            'Sell_Amount__c', 
            'Rate__c',
            'Buy_Currency__c',
            'Buy_Amount__c',
            'Date_Booked__c'}).size());
    }
}