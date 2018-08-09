var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');
router.get('/',function(req,res){
    res.redirect('/blog/1');
})
router.get('/:num',function(req,res){
    var pageNum = req.params.num - 1;
    Post.find({}).count(function(err,count){
        if(pageNum * 6 >=  count)res.redirect('/');
        this.lastNum = 1;
        if(count%6 == 0){
            this.lastNum = count/6;
        }else{
            this.lastNum = Math.floor(count/6) + 1;
        }
    })
    Post.find({}).sort("ansNum").skip(pageNum * 6).limit(6).exec(function(err,data){
        if(err){
            //console.log(err);
            req.flash('error','查找错误');
            return res.redirect('/');
        }
        console.log(lastNum,pageNum);
        res.render('blog',{
            title:'lanceBlog',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            posts: data.reverse(),
            time:moment(new Date()).format('YYYY-MM-DD'),
            pageNum: pageNum,
            lastNum: lastNum
        });
    });
});

//接口
module.exports = router;