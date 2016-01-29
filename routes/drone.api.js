'use strict';

var express = require('express');
var router = express.Router();


/**
 * API's routes
 */

router.get('/flightplan', flightplan);
router.post('/mailauth', mailauth);
router.post('/deliveryack', deliveryack);


/**
 * Mocked implementations
 */

function flightplan(request, response){
	response.status(200).json({
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
    });
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

module.exports = router;
