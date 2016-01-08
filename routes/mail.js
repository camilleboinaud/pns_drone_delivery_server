/**
 * Created by clement on 08/01/15.
 */

var express = require('express');
var router = express.Router();

var http   = require('http'),
qs         = require('querystring'),
nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'qrcode.drone@gmail.com',
    pass: 'QRCode123'//process.env.MDP
  }
});

router.post('/', sendEmail);

function sendEmail (req, res){
    var mail = req.body;

    var mailOptions = {
            from: mail.name+' <'+ mail.sender +'>',
            to: 'clement.forneris@gmail.com',
            subject: 'Confirmation drone delivry ',
            attachments: [{
                    filename: 'lol.jpg',
                    path: './lol.jpg',
            }],
            text: mail.message,
            html: mail.message
    };

    transporter.sendMail(mailOptions, function(err, response){
        if (err){
            console.error(err)
            res.status(500).send()
        } else {
            res.send({status:'success'});
        }
    });
}
module.exports = router;