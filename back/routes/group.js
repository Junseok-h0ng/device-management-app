const express = require('express');
const router = express.Router();
const {Group} = require('../models/Group');

router.post('/create',(req,res)=>{
    const group = new Group(req.body);
    group.save((err,doc)=>{
        if(err) return res.json({errror:true,message:'이미있는 그룹명 입니다.'});
        return res.status(200).json({success:true});
    })
})

module.exports = router;