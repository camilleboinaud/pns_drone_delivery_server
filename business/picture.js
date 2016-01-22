/**
 * Created by remy on 22/01/16.
 */

var fs = require('fs');
const path = '';

function saveFile(body, file, callback) {
    if (file == undefined){
        callback({status: 'fail', value: 'missing file'})
    } else {
        var extansion = (file.mimetype.split('/'))[1];

        fs.rename(__dirname + '/../uploads/' + file.filename, __dirname + '/../uploads/' + file.filename
            + '.' + extansion);

        var url = path + extansion + '/' + file.filename;

        callback({status: 'success', value: 'picture successfully saved', data: url})
    }
}

module.exports = saveFile;
