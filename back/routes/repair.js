const express = require('express');
const router = express.Router();

const {Repair} = require('../models/Repair');

router.post('/add',(req,res)=>{
    const repair = new Repair(req.body);
    repair.save((err,repair)=>{
        if(err) return res.json({erorr:true,err});
        repair.save();
    });
});

router.post('/load',(req,res)=>{
    const groupId = req.body.groupId;
    Repair.find({groupId,done:false})
    .populate('deviceId')
    .exec((err,list)=>{
        if(err) return res.json({error:true,err});
        res.json({success:true,list});
    });
});

router.post('/complete',(req,res)=>{
    req.body.map(device=>{
        Repair.findById({_id:device.id})
        .exec((err,repair)=>{
            if(err) return res.json({error:true,err});
            repair.done = true;
            repair.save();
        })
    })
    res.json({success:true});
});


module.exports = router;