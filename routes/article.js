var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');

router.get('/',function(req,res,next){
        var id = req.query.id;
        if(id && id!=''){
            Post.update({"_id":id},{$inc:{"viewNum":1}},function(err){
                if(err){
                    console.log(err);
                    return res.redirect("back");
                };
            });
            Post.findById(id,function(err,data){
                if(err){
                    console.log(err);
                    req.flash('error','查看文章详细信息出错');
                    return res.redirect('/');
                }
                var ansNumSelf = data.ansNum;
                Post.find({ansNum :{$in: [ansNumSelf+1,ansNumSelf-1]}},function(err,data2){
                    var fastViewData = [];
                    if(data2.length == 1){
                        var checkPosition = data2[0].ansNum;
                        //大于则在左，小于在右
                        if(checkPosition > ansNumSelf){
                            fastViewData.leftName = data2[0].title;
                            fastViewData.leftLink = data2[0]._id;
                        }else{
                            fastViewData.rightName = data2[0].title;
                            fastViewData.rightLink = data2[0]._id;
                            //data.rightArticle[link] = data2[0]._id;
                        }
                    }else if(data2.length == 2){
                            fastViewData.leftName = data2[1].title;
                            fastViewData.leftLink = data2[1]._id;
                            fastViewData.rightName = data2[0].title;
                            fastViewData.rightLink = data2[0]._id;

                    }
                    res.render('article',{
                    user: req.session.user,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString(),
                    post:data,
                    fastViewData: fastViewData,
                    img:path.dirname(__dirname) + '/public/images/'+data.postImg
                })
                });
            });
        }
});

//接口
module.exports = router;