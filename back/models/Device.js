const mongoose = require('mongoose');


const DeviceSchema = mongoose.Schema({
    group_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    device_info_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DeviceInfo'
    },
    serial_number:{
        type:String
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    update_date:{
        type:Date,
        default:Date.now
    }

});

const Device = mongoose.model('User',DeviceSchema);

module.exports = {Device}