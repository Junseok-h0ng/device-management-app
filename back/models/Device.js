const mongoose = require('mongoose');


const deviceSchema = mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    // device_info_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'DeviceInfo'
    // },
    serialNumber:{
        type:String
    },
    owner:{
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