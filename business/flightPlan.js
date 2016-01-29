/**
 * Created by remy on 29/01/16.
 */

var uuid = require('node-uuid');
var mongoose = require('mongoose');

function verify(userId, droneId, callback){
    FlightPlan.findOne({drone_id: droneId, customer:{id:userId}}, function(err, result){
        if (err || result == null){
            callback({status: 'fail', data: err})
        } else {
            result.processed = true;
            result.save(function(err){
                if (err){
                    callback({status:'fail', value: err})
                } else {
                    callback({status:'success', data: result})
                }
            })
        }
    })
}

function checkAcceptance(userId, droneId, callback){
    FlightPlan.findOne({processed: true, drone_id: droneId, customer:{id:userId}}, function(err, result){
        if (err || result == null){
            callback({status: 'fail', value: err})
        } else if (result == null) {
            callback({droneId: droneId,
                mailauth: {
                    result: false,
                    message: "blabla"
                }
            })
        } else {
            callback({droneId: droneId,
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
        } else {
            console.log(result);
            var id = uuid.v4().toString();
            console.log(id);
            result.drone_id = id;
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
    flightPlan.save(function (err){
        if (err){
            callback(err)
        } else {
            callback('success')
        }
    })
}

var flightPlanSchema = mongoose.Schema({
    drone_id: String,
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
