const express = require('express');
const router = express.Router();
const {Device} = require('../models/Device');


router.post('/',(req,res)=>{
    const groupId = req.body.groupId
    Device.find({groupId:groupId})
    .exec((err,deviceList)=>{
        if(err) return res.json({error:true});
        res.json({success:true,deviceList})
    })
})

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
});

router.post('/edit',(req,res)=>{
    const deviceList = req.body.deviceList;
    for(let i = 0;i<deviceList.length;i++){
        Device.findOne({serialNumber:deviceList[i].serialNumber})
        .exec(async (err,device)=>{
            await device.updateOne({
                owner:deviceList[i].owner,
                location:deviceList[i].location,
                update_date:Date.now()
            });
            device.save();
        });
        
        res.json();
    }

});


module.exports = router;