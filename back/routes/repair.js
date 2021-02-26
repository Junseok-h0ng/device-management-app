const express = require('express');
const router = express.Router();

const {Repair} = require('../models/Repair');

router.post('/add',(req,res)=>{
    console.log(req.body);
    const repair = new Repair(req.body);
    repair.save((err,repair)=>{
        if(err) return res.json({erorr:true,err});
        repair.save();
    });
    
});


module.exports = router;