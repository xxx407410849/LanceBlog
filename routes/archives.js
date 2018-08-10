var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var path = require('path');

router.get('/',function(req,res,next){
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
		console.log(list[0]);
		console.log(list[0][0].title);
		res.render('archives',{
			user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            count: countNum,
            list: list
		});
	});
});
module.exports = router;