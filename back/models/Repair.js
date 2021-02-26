const mongoose = require('mongoose');

const repairSchema = mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    deviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Device'
    },
    option:{
        type:String
    },
    explain:{
        type:String
    }


},{timestamps:true});

const Repair = mongoose.model('Repair',repairSchema);

module.exports = {Repair}