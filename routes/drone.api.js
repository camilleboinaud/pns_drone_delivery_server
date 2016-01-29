'use strict';

var express = require('express');
var router = express.Router();

var flightPlan = require('../business/flightPlan');


/**
 * API's routes
 */
router.get('/assign', flightplan);
router.post('/mailauth', mailauth);
router.post('/deliveryack', deliveryack);
router.post('/create', generate);
router.get('/collection', getAllFlightPlan);
router.delete('/drop', dropTable);
router.get('/verify', verify);
router.get('/checkAcceptation', check);

function getAllFlightPlan(req, res){
    flightPlan.all(function(result){
        res.send(result)
    })
}

/**
 * Mocked implementations
 */
function flightplan(req, res){
	// drone_id

    /*response.status(200).json({
        droneId: "0123456789876543210",

        flightPlan: {
            timeout: 30000,
            customer: {
                name: "mockedName",
                coordinates: {
                    latitude: 2.3488,
                    longitude: 48.85341
                }
            },
            order: {
                deliveryTime: 48145939,
                qrCodeValue: "#QRCodesAreAwesomes"
            }
        }

    });*/
    flightPlan.assign(function(result){
        res.send(result)
    })
}

function dropTable(req, res){
    flightPlan.drop(function(result){
        res.send(result)
    })
}

function mailauth(request, response){
	var bo = true;// (Math.random() < .5) ? true : false;
	console.log("hey : " + bo);
    setTimeout(function(){
    	response.status(200).json({
            droneId: "0123456789876543210",
    		mailauth: {
                result: bo,
                message: "blabla"
            }
    	});
    }, 10000)
}

function deliveryack(request, response) {
    response.status(200).json({});
}


function generate(req, res){
    flightPlan.create(req.body, function(result){
        res.send(result);
    })
}

function verify(req, res){
    flightPlan.verify(req.query.transaction, function(result){
        res.send(result)
    })
}

function check(req, res){
    flightPlan.check(req.query.transaction, function(result){
        res.send(result)
    })
}

module.exports = router;

