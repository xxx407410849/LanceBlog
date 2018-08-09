var mongoose = require('mongoose');
var config = require('./../config/config');
mongoose.connect(config.mongodb);
var PostSchema = new mongoose.Schema({
	title:String,
	author:String,
	article:String,
	publishTime:String,
	postImg:String,
	type:String,
	leftArticle:[{
		name:String,
		link:String
	}],
	rightArticle:[{
		name:String,
		link:String
	}],
	comments:[{
		name:String,
		time:String,
		content:String
	}],
	tag:[],
	abstract:String,
	firstView:String,
	viewNum:Number,
	ansNum:Number
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;