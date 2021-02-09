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
    });
});

router.post('/joined',(req,res)=>{
    const groupId = req.body.groupId;
    Group.findById(groupId)
    .populate('join')
    .exec((err,usersInfo)=>{
        if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
        let users = []
        usersInfo.join.map(userInfo=>{
            const user = Object.assign({},userInfo.toJSON());
            delete user.password;
            delete user.groups;
            users.push(user);
        });
        res.json({success:true,users});
    })
});

router.post('/join',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    User.findById(userId)
        .populate('groups')
        .exec((err,user)=>{
            if(err) throw err;
            //유저가 이미 그룹에 속해 있는지 확인
            const result = user.groups.map(group =>group.groupId).indexOf(groupId);
            if(result > -1){
                return res.json({error:true,message:'이미 가입된 아이디 입니다.'});
            }else{
                Group.findByIdAndUpdate({_id:groupId},{
                    $push:{
                        join:userId
                    }
                }).exec((err,group)=>{
                    if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
                    user.groups.push({groupId:groupId,role:'join'});
                    user.save();
                    res.json({success:true});
                })
                
            }  
        });
});

router.post('/accessJoin',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    Group.findByIdAndUpdate({_id:groupId},{
        $push:{
            member:{
                $each:userId
            }
        },
        $pullAll:{
            join:'60210f85979fe31c18dd44c2'
        }
    })
    .exec((err,group)=>{
        if(err) return res.json({error:true,message:'멤버로 전환되는중 오류가 발생했습니다.'});
        console.log(group);
    })
});

router.post('/create',(req,res)=>{

    const group = new Group(req.body);
    group.save((err,group)=>{
        if(err) return res.json({errror:true,message:'이미있는 그룹명 입니다.'});
        User.findById({_id:req.body.root_admin})
        .populate('groups')
        .exec((err,user)=>{
            if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
            user.groups.push({groupId:group._id,role:'owner'});
            user.save();
        });
        return res.status(200).json({success:true,history:group._id});
    });
})

module.exports = router;