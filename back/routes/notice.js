const express = require('express');
const router = express.Router();

const {Notice} = require('../models/Notice');

router.post('/add',(req,res)=>{
    const notice = new Notice(req.body);
    notice.save((err)=>{
        if(err) return res.json({error:true,err});
        res.json({success:true});
    });
});

router.post('/load',(req,res)=>{
    const groupId = req.body.groupId;
    Notice.find({groupId})
    .populate('author')
    .exec((err,notice)=>{
        if(err) return res.json({error:true,message:'불러오는데 오류가 발생했습니다.'});
        let data = []
        notice.map(notice=>{
            const rtn = Object.assign({},notice.toJSON());
            delete rtn.author.password;
            delete rtn.author.groups;
            data.push(rtn);
        });
        res.json({success:true,notice:data});
    });
});

router.post('/info',(req,res)=>{
    const noticeId = req.body.noticeId;
    Notice.findById({_id:noticeId})
    .exec((err,noticeInfo)=>{
        if(err) return res.json({error:true,message:'불러오는데 오류가 발생했습니다.'});
        res.json({success:true,noticeInfo})
    });
});

router.post('/edit',(req,res)=>{
    const noticeId = req.body.noticeId;
    const title = req.body.title;
    const description = req.body.description;

    Notice.findById({_id:noticeId})
    .exec((err,notice)=>{
        notice.title = title;
        notice.description = description;
        notice.save();
    })
})

module.exports = router;