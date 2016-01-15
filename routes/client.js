/**
 * Created by fofo on 30/11/15.
 */

var express = require('express');
var router = express.Router();

var health = require('../business/client');

router.post('/create', createNewClient);

function createNewClient(req,res){

    order(req.body, function(result){
            res.send(result)
    })
}
module.exports = router;