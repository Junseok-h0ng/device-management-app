const passport = require('passport');
const {User} = require('../models/User');
const localStrategy = require('./localStrategy');

module.exports = () =>{
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(async function(id, done) {
        const user = await User.findOne({id:id});
        done(null,user);
    });
    
    localStrategy();

}
