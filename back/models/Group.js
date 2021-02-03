const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
   root_admin:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   },
   device_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Device'
   },
   name:{
       type:String,
       unique: true
   },
   admins:{
       type:Array,
       default:[]
   },
   members:{
       type:Array,
       default:[]
   },
   joinWaiting:{
       type:Array,
       default:[]
   }



});

const Group = mongoose.model('Group',groupSchema);

module.exports = {Group}