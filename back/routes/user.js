const express = require('express');
const router = express.Router();
const passport = require('passport');

const {User} = require('../models/User');

router.post('/register',(req,res)=>{  
    const user = new User(req.body);
    user.save((err,doc)=>{
        if (err) return res.json({success:false,err});
        return res.status(200).json({success:true});
    });
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return next(err);
        if(info) return res.status(401).send(info.reason);
        return req.login(user,(err)=>{
            if(err) return next(err);
            const user = Object.assign({},req.user.toJSON());
            delete user.password;
            return res.json(user);
        })
    })(req,res,next);
});

router.post('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.status(200).send('logout success');
})

module.exports = router;