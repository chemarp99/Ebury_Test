/*
* @description: Class for Trade__c object methods
* @author: jmruizperez1999@gmail.com
* @date: 01/07/2022
* @class: TradeUtil
* @test: TradeUtilTest
*/
public class TradeUtil {
    /*
    * @description: Method that query Trade__c object by fields
    * @author: jmruizperez1999@gmail.com
    * @date: 01/07/2022
    * @param: List<String> fields to query
    * @return: List<Trade__c> Trade list
    */
    public static List<Trade__c> getAllRecordsByFields(List<String> fields){
        try{
            if(fields != null){
                return Database.query('SELECT ' + string.join(fields,',') + ' FROM Trade__c');
            }else{
                return Database.query('SELECT ID FROM Trade__c');
            }
        }catch(Exception ex){
            System.debug('The following exception has occurred: ' + ex.getMessage());
            return null;
        }
    }

    /*
    * @description: Method that creates a new Trade__c object in Database
    * @author: jmruizperez1999@gmail.com
    * @date: 02/07/2022
    * @return: Boolean True if OK False if NOT OK
    */
    public static Boolean saveNewTrade(String sellCcy, Decimal sellAmnt, String buyCcy, Decimal rate){
        try{

            Trade__c trade = new Trade__c();
            trade.Sell_Currency__c = sellCcy;
            trade.Sell_Amount__c = sellAmnt;
            trade.Rate__c = rate;
            trade.Buy_Currency__c = buyCcy;

            insert trade;
            return true;
        }catch(Exception ex){
            System.debug('Exception: ' + ex.getMessage());
            return false;
        }
    }
}
