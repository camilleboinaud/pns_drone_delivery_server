/**
 * Created by remy on 07/01/16.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pns');

module.exports = mongoose;
