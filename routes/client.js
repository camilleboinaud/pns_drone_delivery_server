/**
 * Created by fofo on 30/11/15.
 */

var express = require('express');
var router = express.Router();
var client = require('../business/client');

router.post('/create', createNewClient);
router.get('/viewAll', getAllClient);

function createNewClient(req,res){
   client(req.body, function(result){
            res.send(result)
    })
}
function getAllClient(req, res){
    client.viewAll(function(result){
        if (result.status == 'success'){
            res.send(result.value);
        } else {
            res.send(result)
        }
    })
}
module.exports = router;
