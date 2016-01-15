/**
 * Created by remy on 15/01/16.
 */

var express = require('express');
var router = express.Router();

var order = require('../business/order');

router.post('/create', createOrder);
router.get('/viewAll', getAllOrder);

function createOrder(req, res){
    order.create(req.body, function(result){
        res.send(result);
    })
}

function getAllOrder(req, res){
    order.viewAll(function(result){
        if (result.status == 'success'){
            res.send(result.value);
        } else {
            res.send(result)
        }
    })
}

module.exports = router;
