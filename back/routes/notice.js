const express = require('express');
const router = express.Router();

const {Notice} = require('../models/Notice');

router.post('/add',(req,res)=>{
    const notice = new Notice(req.body);
    notice.save((err)=>{
        if(err) return res.json({error:true,err});
        res.json({success:true});
    });
});

router.post('/load',(req,res)=>{
    const groupId = req.body.groupId;
    Notice.find({groupId})
    .exec((err,notice)=>{
        if(err) return res.json({error:true,message:'불러오는데 오류가 발생했습니다.'});
        res.json({success:true,notice});
    });
});

module.exports = router;