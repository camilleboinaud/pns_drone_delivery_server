/**
 * Created by remy on 15/01/16.
 */

var mongoose = require('../connector/mongodb');

function createNewCommande(params, callback){
    var order = new Order({user_id: params.user_id, qr_code: params.qr_code, drone_id: params.drone_id,
    package_id: params.package_id, delivery_address: params.delivery_address, initial_date: new Date(),
    delivery_ok: false});
    order.save(function(err, result){
        if(err){
            callback({status:'fail', value: err})
        } else {
            callback({status:'success', value: result})
        }
    })
}

function deux(){

}





var orderSchema = mongoose.Schema({user_id: mongoose.Schema.Types.ObjectId,
    qr_code: String,
    drone_id: mongoose.Schema.Types.ObjectId,
    package_id: mongoose.Schema.Types.ObjectId,
    delivery_address: String,
    initial_date: Date,
    delivery_date: Date,
    delivery_ok: Boolean}
);
var Order = mongoose.model('orders', sampleSchema);

module.exports = {
    create : createNewCommande,
    deuxieme : deux
};
