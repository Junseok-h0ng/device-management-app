const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
   device_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Device'
   },
   name:{
       type:String,
       unique: true
   }
});

const Group = mongoose.model('Group',groupSchema);

module.exports = {Group}