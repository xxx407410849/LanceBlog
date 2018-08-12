var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');

router.get('/',function(req,res,next){
	Post.find({}).distinct('type').exec(function(err,data){
		this.typeLength = data.length;
		this.typeItem = data;
	});
	Post.find({},{"type":1,_id:0}).exec(function(err,data){
		var typeList = [];
		data.forEach(function(item){
			if(typeList[item.type] == null) typeList[item.type] = 1;
			else typeList[item.type]++;
		});
		console.log(typeLength);
		res.render('categories',{
			user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            list: typeList,
            listItem: typeItem,
            length: typeLength
		})
	})
});
module.exports = router;
