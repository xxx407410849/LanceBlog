var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/usermodel');
var regemail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
var regqq = /[1-9]([0-9]{5,11})/;
var regphone = /0?(13|14|15|18)[0-9]{9}/;
var regusername = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{6,14}/;
var regpassword = /[a-zA-Z0-9^%&';=?$x22]{8,}/;
router.get('/',function(req,res){
	res.render('reg',{
		title:'注册',
		errors: req.flash("error").toString()
	})
});

router.post('/',function(req,res){
	if(req.body.check == "1"){
		User.findOne({'username':req.body.username},function(err,data){
			if(err){
				res.send("error","500");
			}
			if(data != null){
				res.send("0");
			}else{
				res.send("1");
			}
		});
	}else{
	if(!regusername.test(req.body.username)){
		req.flash("error","用户名非法，tips:别偷改我代码!");
		return res.redirect('/reg');
	}
	if(!regpassword.test(req.body.password)){
		req.flash("error","密码非法，tips:别偷改我代码!");
		return res.redirect('/reg');
	}
	if(!regemail.test(req.body.email) && req.body.email != ""){
		req.flash("error","邮箱非法，tips:别偷改我代码!");
		return res.redirect('/reg');
	}
	if(req.body['password'] != req.body['password-reapt']){
		req.flash("error","两次输入密码不一致,tips:别偷改我代码!");
		return res.redirect('/reg');
	}
	var crypto = require('crypto');
    var crypto = require('crypto');
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');

	var user = new User({
		username : req.body.username,
		password : password,
		email : req.body.email
	});
	User.findOne({'username':user.username},function(err,data){
		if(err){
			req.flash("error","服务器炸了");
			return res.redirect("/reg");
		}
		if(data != null){
			req.flash("error","该用户已存在");
			return res.redirect('/reg');
		}else{
			user.save(function(err){
				if(err){
					req.flash("error","数据库炸了");
					return res.redirect('/reg');
				}
				req.flash("info","注册成功");
				res.redirect('/');
			})
		}
	});
}
});

module.exports = router;