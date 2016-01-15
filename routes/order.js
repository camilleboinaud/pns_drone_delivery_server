/**
 * Created by remy on 15/01/16.
 */

var express = require('express');
var router = express.Router();

var order = require('../business/order');

router.post('/create', createOrder);

function createOrder(req, res){
    order.create(req.body, function(result){
        res.send(result);
    })
}

module.exports = router;
