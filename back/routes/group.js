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

function deleteUserInfo(userInfo){
    const user = Object.assign({},userInfo.toJSON());
    delete user.password;
    delete user.groups;
    return user;
}

router.post('/loadJoin',(req,res)=>{
    const groupId = req.body.groupId;
    Group.findById(groupId)
    .populate('admins members join')
    .exec((err,usersInfo)=>{
        if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
        let join = [];
        let members = [];
        let admins = [];
        
        usersInfo.admins.map(memberInfo=>{
            const user = deleteUserInfo(memberInfo);
            admins.push(user);
        });
        usersInfo.members.map(memberInfo=>{
            const user = deleteUserInfo(memberInfo);
            members.push(user);
        });
        usersInfo.join.map(joinInfo=>{
            const user = deleteUserInfo(joinInfo);
            join.push(user);
        });

        res.json({success:true,admins,members,join});
    });
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
                    res.json({success:true,history:groupId});
                })
                
            }  
        });
});

router.post('/accessJoin',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    Group.findById({_id:groupId})
    .exec((err,group)=>{
        if(err) return res.json({error:true,message:'해당되는 그룹을 찾지 못했습니다.'});
        for(let i = 0; i<userId.length;i++){
            group.members.push(userId[i]);
            group.join.pull(userId[i]);
            User.findByIdAndUpdate({_id:userId[i]})
            .select({groups:{$elemMatch:{groupId:groupId}}})
            .exec((err,user)=>{
                user.groups[0].role = 'member'
                user.save();
                group.save();
                res.json({success:true});
            });
        }
        
    })
});

router.post('/increaseRole',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    Group.findById({_id:groupId})
    .exec((err,group)=>{
        if(err) return res.json({error:true});
        for(let i = 0; i<userId.length;i++){
            group.admins.push(userId[i]);
            group.members.pull(userId[i]);
            User.findById({_id:userId[i]})
            .select({groups:{$elemMatch:{groupId:groupId}}})
            .exec((err,user)=>{
                user.groups[0].role = 'admin';
                user.save();
                group.save();
                res.json({success:true});
            });
        }
    });
});

router.post('/decreaseRole',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    Group.findById({_id:groupId})
    .exec((err,group)=>{
        if(err) return res.json({error:true});
        for(let i=0;i<userId.length;i++){
            group.admins.pull(userId[i]);
            group.members.push(userId[i]);
            User.findById({_id:userId[i]})
            .select({groups:{$elemMatch:{groupId:groupId}}})
            .exec((err,user)=>{
                user.groups[0].role = 'member';
                user.save();
                group.save();
                res.json({success:true});
            })
        }
    })
})

router.post('/rejectJoin',(req,res)=>{
    const groupId = req.body.groupId;
    const userId = req.body.userId;
    Group.findById({_id:groupId})
    .exec((err,group)=>{
        if(err) return res.json({error:true,message:'해당되는 그룹을 찾지 못했습니다.'});
        for(let i = 0; i<userId.length;i++){
            group.join.pull(userId[i]);
            User.findById({_id:userId[i]})
            .exec((err,user)=>{
                const deleteGroup = user.groups.map(group=>group.groupId).indexOf(groupId);
                user.groups[deleteGroup].remove();
                user.save();
                group.save();
                res.json({success:true});
            })
        }
    })
})

router.post('/create',(req,res)=>{
    const group = new Group(req.body);
    User.findById({_id:req.body.root_admin})
    .populate('groups')
    .exec((err,user)=>{
        if(err) return res.json({error:true,message:'잘못된 접근 입니다.'});
        user.groups.push({groupId:group._id,role:'owner'});
        user.save();
        group.save();
    });
    return res.status(200).json({success:true,history:group._id});
})

module.exports = router;