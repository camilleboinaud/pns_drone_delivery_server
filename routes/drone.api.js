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
router.post('/createFlightPlan', generate);
router.get('/collection', getAllFlightPlan);

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

function mailauth(request, response){
    setTimeout(function(){
    	response.status(200).json({
            droneId: "0123456789876543210",
    		mailauth: {
                result: (Math.random() < .5) ? true : false,
                message: "blabla"
            }
    	});
    }, 60000)
}

function deliveryack(request, response) {
    response.status(200).json({});
}

function generate(req, res){
    flightPlan.create(req.body, function(result){
        res.send(result);
    })
}

module.exports = router;