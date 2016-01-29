/**
 * Created by remy on 22/01/16.
 */

var fs = require('fs');

function saveFile(body, file, callback) {
    if (file == undefined){
        callback({status: 'fail', value: 'missing file'})
    } else {
        var extansion = file.originalname.split('.');

        fs.rename(__dirname + '/../uploads/' + file.filename, __dirname + '/../uploads/' + file.filename
            + '.'+ extansion[extansion.length -1]);

        callback({status: 'success', value: 'picture successfully saved'})
    }
}

module.exports = saveFile;
