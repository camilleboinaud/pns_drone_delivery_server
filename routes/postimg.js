/**
 * Created by clement on 08/01/15.
 */

var express = require('express');
var router = express.Router();

var picture = require('../business/picture');

router.post('/upload', postImg);
router.get('/download/:transaction', download);


function postImg(req, res){
    picture.save(req.body, req.file, function(result){
        res.send(result);
    })
}

function download(req, res){
    picture.download(req.params.transaction, function(file, contentType){
        if (file == 'fail'){
            res.send({status: 'fail', value: 'error server'})
        } else if (file == 'noFile'){
            res.status(404).send({status: 'fail', value: 'No File Found'})
        } else {
            res.writeHead(200, contentType);
            res.end(file, 'binary');
        }
    })
}

module.exports = router;
