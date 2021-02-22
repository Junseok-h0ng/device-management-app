const express = require('express');
const router = express.Router();
const {Device} = require('../models/Device');
const {Location} = require('../models/Location');

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

router.post('/location/add',(req,res)=>{
    const groupId = req.body.groupId;
    const locationValue = req.body.locationValue;
    Location.findOne({groupId})
    .exec((err,location)=>{
        if(location){
            for(let i =0; i<location.location.length;i++){
                if(location.location[i] == locationValue){
                    return res.json({error:true,message:'이미 있는 정보입니다.'});
                }
            }
            location.location.push(locationValue);
            location.save();
        }else{
            const location = Location(req.body);
            location.save();
        }
    })
})


module.exports = router;