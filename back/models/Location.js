const mongoose = require('mongoose');


const locationSchema = mongoose.Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    location:{
        type:Array
    }
});

const Location = mongoose.model('Location',locationSchema);

module.exports = {Location}