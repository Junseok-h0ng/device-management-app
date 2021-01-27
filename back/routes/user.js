const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const {User} = require('../models/User');

router.post('/register',(req,res)=>{  
    const user = new User(req.body);
    user.save((err,doc)=>{
        if (err) return res.json({success:false,err});
        return res.status(200).json({success:true});
    });
});

router.get('/login',(req,res)=>{
    const userInfo = req.body;
    User.findOne({email:userInfo.email},(err,user)=>{
        if(err) return res.json({success:false,err});
        
        user.comparePassword(userInfo.password,(err,isMatch)=>{
            if(!isMatch){
                return res.json({loginSuccess:false, message:"Wrong password"});
            }
            return res.json({loginSuccess:true,user});
        })
    })
})

module.exports = router;