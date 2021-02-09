const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
   device_id:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Device'
   },
   name:{
       type:String,
       unique: true
   },
   member:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
   }],
   join:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   }]
});

const Group = mongoose.model('Group',groupSchema);

module.exports = {Group}