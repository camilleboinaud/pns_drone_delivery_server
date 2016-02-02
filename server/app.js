/**
 * Created by remy on 30/11/15.
 */

var express = require("express");
var bodyParser = require("body-parser");
var multer = require('multer');

var api = require('../routes/drone.api');
var health = require('../routes/health');
var order = require('../routes/order');
var mail = require('../routes/mail');
var client = require('../routes/client');
var postPic = require('../routes/postimg');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({dest:'./uploads/'}).single('file')); // for parsing multipart/form-data

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); //"Origin, X-Requested-With, Content-Type, Accept"
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/', function(req, res){
    res.send('<h1>Are you lost ? * &lt;--- You are here !</h1>');
});

app.use('/health', health);
app.use('/mail', mail);
app.use('/order', order);
app.use('/clients', client);
app.use('/file', postPic);
app.use('/flightPlan', api);

module.exports = app;
