/**
 * Created by fofo on 30/11/15.
 */

var express = require('express');
var router = express.Router();

var client = require('../business/client');

router.post('/create', createNewClient);

function createNewClient(req,res){

    client(req.body, function(result){
            res.send(result)
    })
}
module.exports = router;
