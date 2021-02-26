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
    issue:{
        type:String
    },
    explain:{
        type:String
    },
    done:{
        type:Boolean
    }


},{timestamps:true});

const Repair = mongoose.model('Repair',repairSchema);

module.exports = {Repair}