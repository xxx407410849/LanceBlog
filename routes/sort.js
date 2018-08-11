var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');

router.get('/',function(req,res,next){
    Post.find().distinct('tag').exec(function(err,data){
        this.lengthNum = data.length;
        this.NumCountItem = data;
    });
    Post.find({},{tag:1,_id:1},function(err,data){
        var NumCount = [];
        var NumMax = 0;
        var NumMix = 10000;
        data.forEach(function(item,idx){
            for(var i = 0 ; i < item.tag.length ; i++){
                if(NumCount[item.tag[i]] == null) NumCount[item.tag[i]] = {
                    countNum : 1,
                    fontSize : 0,
                    fontColor : 0,
                    id : item.id
                };
                else NumCount[item.tag[i]].countNum++;
            }
        });
        //得到最大最小值
        for(var i = 0 ; i < NumCountItem.length ; i++){
            if(NumCount[NumCountItem[i]].countNum > NumMax){
                NumMax = NumCount[NumCountItem[i]].countNum;
            }
            if(NumCount[NumCountItem[i]].countNum < NumMix){
                NumMix = NumCount[NumCountItem[i]].countNum;
            }
        }
        var NumDistance = NumMax-NumMix;
        var sizeSpeed = 8 / NumDistance;
        var colorSpeed = Math.floor(8/NumDistance);
        for(var i = 0 ; i < NumCountItem.length ; i++){
            NumCount[NumCountItem[i]].fontSize = (NumCount[NumCountItem[i]].countNum - NumMix) * sizeSpeed + 12 + "px";
            NumCount[NumCountItem[i]].fontColor = "#" + parseInt(( 9 - (NumCount[NumCountItem[i]].countNum - NumMix) * colorSpeed)) + ( 9 - (NumCount[NumCountItem[i]].countNum - NumMix) * colorSpeed ) + ( 9 - (NumCount[NumCountItem[i]].countNum - NumMix) * colorSpeed)
        }
        console.log(NumCount);
        res.render('sort',{
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            NumCount:NumCount,
            NumCountItem:NumCountItem,
            length:lengthNum,
        });
    });
});
//接口
module.exports = router;