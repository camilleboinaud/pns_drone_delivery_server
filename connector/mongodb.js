/**
 * Created by remy on 07/01/16.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pns', function(err){
    if (err){
        console.log('['+(new Date()).toString()+'] ERROR : impossible to connect MongoDB : ');
        console.log(err)
    } else {
        console.log('['+(new Date()).toString()+'] INFO : Connection successfully established with MongoDB');
    }
});

module.exports = mongoose;
