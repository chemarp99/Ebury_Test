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
                return Database.query('SELECT ID FROM Trade');
            }
        }catch(Exception ex){
            System.debug('The following exception has occurred: ' + ex.getMessage());
            return null;
        }
    }
}
