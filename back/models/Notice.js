const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date
    }
},{timestamps:true});

const Notice = mongoose.model('Notice',noticeSchema);

module.exports = {Notice}