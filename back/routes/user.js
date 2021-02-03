const express = require('express');
const router = express.Router();
const passport = require('passport');

const {User} = require('../models/User');

//유저의 로그인 상태여부 검사
router.post('/',(req,res)=>{
    if(req.user){
        const user = Object.assign({},req.user.toJSON());
        delete user.password;
        return res.status(200).json(user);
    }else{
        return res.status(401).send("로그인을 해야합니다.");
    }
})

router.post('/register',(req,res)=>{  
    const user = new User(req.body);
    user.save((err,doc)=>{
        if (err) return res.json({error:true,message:'이미있는 이메일 주소 입니다.'});
        return res.status(200).json({success:true});
    });
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return next(err); 
        if(info) return res.json({error:true,message:info.message});
        return req.login(user,(err)=>{
            if(err) return next(err);
            const user = Object.assign({},req.user.toJSON());
            delete user.password;
            return res.json(user);
        });
    })(req,res,next);
});

router.post('/logout',(req,res)=>{
    req.logout();
    req.session.destroy();
    res.status(200).send('logout success');
})

module.exports = router;