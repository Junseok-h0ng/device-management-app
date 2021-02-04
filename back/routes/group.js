const express = require('express');
const router = express.Router();
const {Group} = require('../models/Group');
const {User} = require('../models/User');

router.post('/',(req,res,next)=>{
    Group.find({_id:{$in:req.body}})
    .select('name')
    .exec((err,groups)=>{
        if(err) return res.json({error:true,message:'그룹 로드를 실패했습니다.'});
        return res.json(groups);
    })
})

router.post('/create',(req,res)=>{

    const group = new Group(req.body);
    group.save((err,group)=>{
        if(err) return res.json({errror:true,message:'이미있는 그룹명 입니다.'});
        User.findById({_id:req.body.root_admin})
        .populate('groups')
        .exec((err,user)=>{
            if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
            user.groups.push(group._id);
            user.save();
        });
        return res.status(200).json({success:true});
    });
})

module.exports = router;