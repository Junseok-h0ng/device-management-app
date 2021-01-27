const mongoose = require('mongoose');


const groupSchema = mongoose.Schema({
   root_admin:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
   },
   admins:{
       type:Array,
       default:[]
   },
   members:{
       type:Array,
       default:[]
   }


});

const Group = mongoose.model('Group',groupSchema);

module.exports = {Group}