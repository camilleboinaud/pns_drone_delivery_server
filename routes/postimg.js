/**
 * Created by clement on 08/01/15.
 */

var express = require('express');
var router = express.Router();

var upload = require('../business/picture');

router.post('/picture', postImg);


function postImg(req, res){
    upload(req.body, req.file, function(result){
        res.send(result);
    })
}

module.exports = router;
