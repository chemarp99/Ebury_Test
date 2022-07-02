/*
* @author: jmruizperez1999@gmail.com
* @date: 01/07/2021
* @class: TradeManagementControllerTest
*/
@isTest
public class TradeManagementControllerTest {
    @testSetup static void setup() {
        Trade__c trade = new Trade__c();
        trade.Buy_Currency__c = 'USD';
        trade.Rate__c = 1.2323;
        trade.Sell_Amount__c = 500.12;
        trade.Sell_Currency__c = 'GBP';
        insert trade;
    }
    @isTest
    static void testGetTrades(){
        System.assertEquals(1, TradeManagementController.getTrades().size());
    }

    @isTest
    static void testCreateTrade(){
        System.assertEquals(true, TradeManagementController.createTrade('GBP', 100, 'EUR', 1.2345));
    }
}
