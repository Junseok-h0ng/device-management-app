const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    groups:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    email:{
        type: String,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        minlength:5
    },
    lastname:{
        type:String
    },
    firstname:{
        type:String
    }

});

const User = mongoose.model('User',UserSchema);

module.exports = {User}