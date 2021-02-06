const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
    groups:[
        {
        groupId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Group'
        },
        role:{
            type:String
        }
    }],
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type:String,
        minlength:5,
        trim: true,
        required: true
    },
    name:{
        type:String,
        required: true
    }

});

userSchema.pre('save',function(next){
    let user = this;
    const saltRounds = 10;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});
userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    });
}

const User = mongoose.model('User',userSchema);

module.exports = {User}