/*
* @description: Controller class of tradeManagement LWC
* @author: jmruizperez1999@gmail.com
* @date: 01/07/2022
* @class: TradeManagementController
* @test: TradeManagementControllerTest
*/
public class TradeManagementController {
    /*
    * @description: Method that get all trades from database
    * @author: jmruizperez1999@gmail.com
    * @date: 01/07/2022
    * @return: List<Trade__c> Trade list
    */
    @AuraEnabled
    public static List<Trade__c> getTrades(){
        try{
            return TradeUtil.getAllRecordsByFields(new List<String>{
                                                    'Sell_Currency__c', 
                                                    'Sell_Amount__c', 
                                                    'Rate__c',
                                                    'Buy_Currency__c',
                                                    'Buy_Amount__c',
                                                    'Date_Booked__c'});
        }catch(Exception ex){
            System.debug('Exception: ' + ex.getMessage());
            return null;
        }
    }
}
