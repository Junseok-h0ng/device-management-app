const mongoose = require('mongoose');


const deviceSchema = mongoose.Schema({
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
    location:{
        type:String
    },
    update_date:{
        type:Date,
        default:Date.now
    }

});

const Device = mongoose.model('Device',deviceSchema);

module.exports = {Device}