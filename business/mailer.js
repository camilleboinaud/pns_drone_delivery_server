/**
 * Created by remy on 29/01/16.
 */

var nodemailer = require('nodemailer');
var user = require('../business/client').find;

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'qrcode.drone@gmail.com',
        pass: 'QRCode123'//process.env.MDP
    }
});

function sendEmail(userId, transaction, callback) {
    user(userId, function (result) {
        if (result.status == 'fail') {
            callback(result)
        } else if (result.data == null) {
            callback({status: 'fail', value: 'user is not defined'})
        } else {
            var mailOptions = {
                from: 'QRCodeDelivery' + ' <qrcode.drone@gmail.com>',
                to: result.data.client_email,
                subject: 'Confirmation de livraison',
                text: 'Bonjour ' + result.data.client_firstName + ',\nMerci de bien vouloir cliquer sur le lien suivant pour autoriser la livraison de votre colis :\n\n' +
                'http://localhost:4000/flightPlan/verify?transaction='+transaction+'\n\n' +
                'Merci pour votre confiance envers QRCodeDelivery & Co,\net a bientôt sur l\'un de nos nombreux services.'
            };
            transporter.sendMail(mailOptions, function (err, response) {
                if (err) {
                    callback({status: 'fail', value: err})
                } else {
                    callback({status: 'success', data: response});
                }

            })
        }
    });
}

function sendMailWithPicture(userId, transaction){
    user(userId, function(result){
        if (result.status == 'fail') {
            callback(result)
        } else if (result.data == null) {
            callback({status: 'fail', value: 'user is not defined'})
        } else {
            var mailOptions = {
                from: 'QRCodeDelivery' + ' <qrcode.drone@gmail.com>',
                to: result.data.client_email,
                subject: 'Validation de livraison',
                text: 'Bonjour ' + result.data.client_firstName + ',\nPour vérifier que votre colis à bien été livré, merci de bien vouloir cliquer sur le lien suivant :\n\n' +
                'http://localhost:4000/file/download/'+transaction+'\n\n' +
                'Merci pour votre confiance envers QRCodeDelivery & Co,\net a bientôt sur l\'un de nos nombreux services.'
            };
            transporter.sendMail(mailOptions, function (err, response) {
                if (err){
                    console.log(err)
                }
            })
        }
    })
}

function sendQRCode(userId, qrCode){
    user(userId, function(result){
        if (result.status == 'fail') {
            console.log(result)
        } else if (result.data == null) {
            console.log({status: 'fail', value: 'user is not defined'})
        } else {
            var mailOptions = {
                from: 'QRCodeDelivery' + ' <qrcode.drone@gmail.com>',
                to: result.data.client_email,
                subject: 'QRCode de livraison',
                attachments: [{
                 filename: 'QRCode.png',
                 path: __dirname + '/../qrCodes/'+qrCode
                 }],
                text: 'Bonjour ' + result.data.client_firstName + ',\nVoici le QRCode a présenter lors de la livraison de votre colis.\n' +
                'Surtout ne le perdez pas.\n\n' +
                'Merci pour votre confiance envers QRCodeDelivery & Co,\net a bientôt sur l\'un de nos nombreux services.'
            };
            transporter.sendMail(mailOptions, function (err, response) {
                if (err){
                    console.log(err)
                }
            })
        }
    })
}

module.exports = {
    sendMail: sendEmail,
    sendPicture: sendMailWithPicture,
    sendQRCode: sendQRCode
};
