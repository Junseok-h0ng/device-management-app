const express = require('express');
const router = express.Router();
const {Device} = require('../models/Device');
const {Location} = require('../models/Location');

router.post('/',(req,res)=>{
    const groupId = req.body.groupId;
    Device.find({groupId:groupId})
    .exec((err,deviceList)=>{
        if(err) return res.json({error:true});
        res.json({success:true,deviceList})
    });
});

router.post('/ownerList',(req,res)=>{
    const ownerId = req.body.ownerId;
    Device.find({owner:ownerId})
    .exec((err,deviceList)=>{
        if(err) return res.json({error:true});
        res.json({success:true,deviceList});
    })
})

router.post('/add',  (req,res)=>{
    const deviceInfo = req.body.deviceInfo;
    for(let i = 0; i<deviceInfo.length;i++){
        Device.findOne({serialNumber:deviceInfo[i].serialNumber})
        .exec((err,device)=>{
            if(err) throw err;
            if(device || deviceInfo[i] == '-'){
                return res.status(401).send();
            }else{
                const device = new Device(deviceInfo[i]);
                device.save();
            }
        });
    }
    res.json({success:true});
});

router.post('/edit',(req,res)=>{
    const deviceList = req.body.deviceList;
    for(let i = 0;i<deviceList.length;i++){
        Device.findOneAndUpdate({serialNumber:deviceList[i].serialNumber},{
            $set:{
                owner:deviceList[i].owner,
                location:deviceList[i].location
            }
        })
        .exec((err,device)=>{
            device.save();
        });
    }
    res.json({success:true});
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
    });
});

router.post('/location/load',(req,res)=>{
    const groupId = req.body.groupId;
    Location.findOne({groupId})
    .exec((err,location)=>{
        if(err) return res.json({error:true,message:'해당되는 정보가 없습니다.'});
        if(!location){
            res.json({error:true,message:'위치 정보가 없습니다.'});
        }else{
            res.json({success:true,location:location.location});
        }
        
    })
})

module.exports = router;