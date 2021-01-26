const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema({
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

const Group = mongoose.model('Group',GroupSchema);

module.exports = {Group}