/**
 * Created by remy on 29/01/16.
 */

var uuid = require('node-uuid');
var mongoose = require('mongoose');
var fs = require('fs');
var qrcode = require('qr-image');
var randomString = require("randomstring");

var sendQRCode = require('./mailer').sendQRCode;

function verify(transaction, callback){
    FlightPlan.findOne({transaction: transaction}, function(err, result){
        console.log(result);
        if (err || result == null){
            callback({status: 'fail', data: err})
        } else {
            console.log(result);
            result.processed = true;
            result.save(function(err){
                if (err){
                    callback({status:'fail', value: err})
                } else {
                    callback('<html><h1 color="c0a000">Merci d\'avoir confirmez votre livraison de commande</h1><br><h2>A bientôt sur l\'un de nos nombreux services</h2></html>')
                }
            })
        }
    })
}

function checkAcceptance(transaction, callback){
    FlightPlan.findOne({processed: true, transaction: transaction}, function(err, result){
        if (err){
            callback({status: 'fail', value: err})
        } else if (result == null) {
            callback({transaction: transaction,
                mailauth: {
                    result: false,
                    message: "blabla"
                }
            })
        } else {
            callback({transaction: transaction,
                mailauth: {
                    result: true,
                    message: "blabla"
                }
            })
        }
    })
}

function dropTable(callback){
    FlightPlan.remove({}, function(err){
        if (err){
            callback(err)
        } else {
            callback('success')
        }
    })
}

function getAll(callback){
    FlightPlan.find(function(err, result){
        if (err){
            callback(err)
        } else {
            callback(result)
        }
    })
}

function assign(callback){
    FlightPlan.findOne({inProgress : false}, function(err, result){
        if (err){
           callback(err)
        } else if (result == null) {
            callback('fail')
        } else {
            console.log(result);
            var id = uuid.v4().toString();
            console.log(id);
            result.transaction = id;
            result.inProgress = true;
            result.save(function (err){
                if (err) {
                    callback(err)
                } else {
                    callback(result);
                }
            })
        }
    })
}

function create(body, callback){

    var flightPlan = new FlightPlan({
        flightPlan: body.flightPlan,
        inProgress: false,
        processed: false
    });

    var random = randomString.generate(30);
    flightPlan.flightPlan.order.qrCodeValue = random;

    var qr_png = qrcode.image(random, { type: 'png' });
    var output = fs.createWriteStream(__dirname + '/../qrCodes/'+random+'.png');
    qr_png.pipe(output);
    sendQRCode(flightPlan.flightPlan.customer.id, random+'.png');


    // TODO : Generate random string an send special QRCode
    flightPlan.save(function (err){
        if (err){
            callback(err)
        } else {
            callback('success')
        }
    })
}

var flightPlanSchema = mongoose.Schema({
    transaction: String,
    flightPlan: {
        timeout: Number,
        customer: {
            name: String,
            id: mongoose.Schema.ObjectId,
            coordinates: {
                latitude: Number,
                longitude: Number
            }
        },
        order: {
            deliveryTime: Number,
            qrCodeValue: String
        }
    },
    inProgress: Boolean,
    processed: Boolean
});

var FlightPlan = mongoose.model('flightPlans', flightPlanSchema);

module.exports = {
    create: create,
    assign: assign,
    all: getAll,
    drop: dropTable,
    verify: verify,
    check: checkAcceptance
};
