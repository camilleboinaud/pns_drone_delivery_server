/**
 * Created by clement on 08/01/15.
 */

var express = require('express');
var router = express.Router();

var mail = require('../business/mailer');

router.post('/authentication', sendEmail);

function sendEmail (req, res){
    if (req.query.userId != undefined) {
        mail(req.query.userId, req.query.transaction, function(result){
            res.send(result)
        })
    } else {
        res.send({status: 'fail', value: 'userId is needed'})
    }
}

module.exports = router;
