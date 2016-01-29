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

function sendEmail(userId, callback){
    user(userId, function(result){
        if (result.status == 'fail'){
            callback(result)
        } else if (result.data == null) {
            callback({status:'fail', value:'user is not defined'})
        } else {
            var mailOptions = {
                from: 'QRCodeDelivery'+' <qrcode.drone@gmail.com>',
                to: result.data.client_email,
                subject: 'Confirmation de livraison',
                attachments: [/*{
                 filename: 'lol.jpg',
                 path: './lol.jpg'
                 }*/],
                text: 'Bonjour ' + result.data.client_firstName+',\nMerci de bien vouloir cliquer sur le lien suivant pour autoriser la livraison de votre colis :\n\n'+
                '(Ici aura place le futur lien)\n\n'+
                'Merci pour votre confiance envers QRCodeDelivery & Co,\net a bientôt sur l\'un de nos nombreux services.'
            };
            transporter.sendMail(mailOptions, function(err, response){
                if (err){
                    callback({status: 'fail', value: err})
                } else {
                    callback({status:'success', data: response});
                }
            });
        }
    });
}

module.exports = sendEmail;
