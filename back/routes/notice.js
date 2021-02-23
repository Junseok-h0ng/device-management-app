const express = require('express');
const router = express.Router();

const {Notice} = require('../models/Notice');

router.post('/add',(req,res)=>{
    const notice = new Notice(req.body);
    console.log(notice);
    notice.save((err)=>{
        if(err) return res.json({error:true,err});
        res.json({success:true});
    })
});

module.exports = router;