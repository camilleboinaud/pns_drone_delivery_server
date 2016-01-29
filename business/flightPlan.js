/**
 * Created by remy on 29/01/16.
 */

var uuid = require('node-uuid');
var mongoose = require('mongoose');

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
    drop: dropTable
};
