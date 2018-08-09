var mongoose = require('mongoose');
var config = require('./../config/config');
mongoose.connect(config.mongodb);

var UserSchema = new mongoose.Schema({
	username:String,
	password:String,
	email:String
});
//创建User集合
var User = mongoose.model('User',UserSchema);
//暴露接口
module.exports = User;