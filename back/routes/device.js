const express = require('express');
const router = express.Router();
const {Device} = require('../models/Device');


router.post('/add',  (req,res)=>{
    const deviceInfo = req.body.deviceInfo;
    let alreadyDevice =  [];
    for(let i = 0; i<deviceInfo.length;i++){
        Device.findOne({serialNumber:deviceInfo[i].serialNumber})
        .exec((err,device)=>{
            if(err) throw err;
            if(device || deviceInfo[i] == 'null'){

            }else{
                const device = new Device(deviceInfo[i]);
                device.save();
            }
        });
 
    }
    return res.json({success:true,alreadyDevice});


    // Device.insertMany(deviceInfo);


});


module.exports = router;