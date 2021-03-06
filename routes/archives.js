var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');

router.get('/',function(req,res,next){
	if(req.query.tag != null){
		var tag = req.query.tag;
		Post.find({"tag":tag}).exec(function(err,data){
			var list = [];
			data.forEach(function(item,idx){
				list.push({
					date:moment(item.publishTime).format('M-DD'),
					title: item.title,
					id: item._id
				});
			});
			res.render('archives',{
				user: req.session.user,
            	success: req.flash('success').toString(),
           	 	error: req.flash('error').toString(),
            	count: list.length,
            	list: list,
            	isTag: true,
            	isTategory: false,
            	tag: tag
			});
		});
	}else if(req.query.type != null){
		var type = req.query.type;
		Post.find({"type":type}).exec(function(err,data){
			var list = [];
			data.forEach(function(item,idx){
				list.push({
					date:moment(item.publishTime).format('M-DD'),
					id: item._id,
					title: item.title
				});
			});
			res.render('archives',{
				user: req.session.user,
            	success: req.flash('success').toString(),
           	 	error: req.flash('error').toString(),
            	count: list.length,
            	list: list,
            	isTag: false,
            	isTategory: true,
            	category: type
			})
		})
	}else{
	Post.find({}).count(function(err,data){
		this.countNum = data;
	});
	Post.find({}).sort("-ansNum").exec(function(err,data){
		var list = [];
		var article = [];
		data.forEach(function(item){
			var header = moment(item.publishTime).format('YYYY.M');
			item.publishTime = moment(item.publishTime).format('M-DD');
			var listNum = parseInt(moment(header).toArray()[1]) + parseInt(moment(header).toArray()[0]) - 2025;
			article.push({
				date:item.publishTime,
				title: item.title,
				id: item._id
			});
			list[listNum] = article;
		});
		res.render('archives',{
			user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            count: countNum,
            list: list,
            isTag: false,
            isTategory: false
		});
	});
}
});
module.exports = router;