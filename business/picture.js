/**
 * Created by remy on 22/01/16.
 */

var fs = require('fs');
var mongoose = require('../connector/mongodb');
var sendPicture = require('../business/mailer').sendPicture;

function saveFile(body, file, callback) {
    if (file == undefined) {
        callback({status: 'fail', value: 'missing file'})
    } else {
        var extansion = file.originalname.split('.');

        fs.rename(__dirname + '/../uploads/' + file.filename, __dirname + '/../uploads/' + file.filename
            + '.' + extansion[extansion.length - 1]);
    }

    var fileToSave = new File({
        filePath: file.filename + '.' + extansion[extansion.length - 1],
        extension: extansion[extansion.length - 1],
        transaction: body.transaction
    });
    fileToSave.save(function (err) {
        if (err) {
            callback({status: 'fail', value: err})
        } else {
            callback({status: 'success', value: 'picture successfully saved'});
            sendPicture(body.userId, body.transaction)
        }
    })
}

function download(transaction, callback) {
    File.findOne({transaction: transaction}, function (err, result) {
        if (err) {
            callback('fail')
        } else if (result == null) {
            callback('noFile')
        } else {
            var file;
            try {
                file = fs.readFileSync(__dirname + '/../uploads/' + result.filePath);
            } catch (error) {
                file = 'fail'
            }
            var contentType = {'Content-Type': result.extension};
            callback(file, contentType);
        }
    })
}

var FileSchema = mongoose.Schema({
    filePath: String,
    transaction: String,
    extension: String
});
var File = mongoose.model('file', FileSchema);

module.exports = {
    save: saveFile,
    download: download
};
