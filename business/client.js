var mongoose = require('../connector/mongodb')

function createNewClient(params, callback) {
    var client = new Client({
        client_firstName: params.client_firstName,
        client_lastName: params.client_lastName,
        client_dateOfBirth: params.client_dateOfBirth,
        client_address: params.client_adress,
        client_lat: params.client_lat,
        client_long: params.client_long,
        client_email: params.client_email,
        client_password: params.client_password
    });

    client.save(function (err, result) {
        if (err) {
            callback({status: 'fail', value: err})
        }
        else {
            delete result.client_password;
            callback({status: 'success', value: result})
        }
    })
}

function viewAllClient(callback) {
    Client.find(function (err, result) {
        if (err) {
            callback({status: 'fail', value: err})
        } else {
            callback({status: 'success', value: result})
        }
    })
}

function getOne(client_id, callback) {
    Client.findOne({_id: client_id}, function (err, result) {
        if (err) {
            callback({status: 'fail', value: err})
        } else {
            callback({status: 'success', data: result})
        }
    })
}

var clientSchema = mongoose.Schema({
    client_id: mongoose.Schema.Types.ObjectId,
    client_firstName: String,
    client_lastName: String,
    client_dateOfBirth: Date,
    client_address: String,
    client_lat: Number,
    client_long: Number,
    client_email: String,
    client_password: String
});

var Client = mongoose.model('clients', clientSchema);

module.exports = {
    create: createNewClient,
    viewAll: viewAllClient,
    find: getOne
};
