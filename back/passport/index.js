const passport = require('passport');
const {User} = require('../models/User');
const localStrategy = require('./localStrategy');

module.exports = () =>{
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        console.log(id);
        User.findById(id,(err,user)=>{
            done(null,user);
        });
    });
    localStrategy();

}
