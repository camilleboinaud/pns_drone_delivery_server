/**
 * Created by remy on 09/12/15.
 */

var cassandra = require('cassandra-driver');
var client;

(function init(){
    client = new cassandra.Client({ contactPoints: ['127.0.0.1'] });
    client.connect(function(err){
        if (err) {
            console.log('['+(new Date()).toString()+'] ERROR: error during connexion with Cassandra : ' + err);
        } else {
            console.log('['+(new Date()).toString()+'] INFO: connection successfully established with Cassandra');
        }
    });
})();

module.exports = client;