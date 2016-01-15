/**
 * Created by clement on 08/01/15.
 */

var express = require('express');
var router = express.Router();
router.post('/postimg', sendImg);


function getgIm(req, res){

    var jsonResp = {
        status : 'success',
        data : 'image well received'
    };

    res.send(jsonResp);
}
module.exports = router;