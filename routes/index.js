var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/usermodel');
var crypto = require('crypto');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
   title: 'lANcElOT',
   user: req.session.user
});
});

router.post('/',function(req,res) {
	var md5 = crypto.createHash('md5');
	var password = md5.update(req.body.password).digest('base64');
	User.findOne({'username':req.body.username},function(err,data){
		if(err){
			console.log("error");
		}
		if(data == null){
			res.send("0");
		}else{
			if(data.password != password){
				res.send("1");
			}else{
				req.session.user = data;
				res.send("2");
			}
		}
	});
});
module.exports = router;
