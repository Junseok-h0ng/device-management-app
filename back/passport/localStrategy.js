const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local');
const {User} = require('../models/User');


module.exports = () =>{

    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        session:true,
        passReqToCallback:true
    },
        function(req,email, password, done) {
          User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            user.comparePassword(password,(err,isMatch)=>{
                if(isMatch){
                    return done(null,user);
                }
                return done(null, false,{message:'패스워드가 틀렸습니다.'});
            });
          });
        }
      ));
}
