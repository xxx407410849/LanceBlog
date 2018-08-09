var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('./../models/postmodel');
var moment = require('moment');
var multiparty = require('multiparty');
var path = require('path');
var multipart = require('connect-multiparty');
var formidable = require('formidable');
var multer = require('multer');

var postimg = null;
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var imgPath = path.dirname(__dirname) + '/public/lauchimg/'
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, imgPath);
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        postimg = Date.now() + "-" + file.originalname;
        cb(null,postimg);  
    }
});

var fileFilter = function(req, file, cb) {
    if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/gif' && file.mimetype != 'image/jpg') {
        cb(null,false);
    }else{
        cb(null,true);
    }
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

var multipartMiddleware = multipart();

router.get('/',function(req, res) {
    if(req.session.user != null){
    if(req.session.user.username != "lANcElOTA"){
        res.redirect('/blog');
    }
    }else{
        res.redirect('/blog');
    }
    if(req.query != null){
        var id = req.query.id;
        Post.findById(id,function(err,data){
            res.render('post', {
                user: 'lANcElOT',
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                post: data
            })
        })
    }else{
    res.render('post', {
        user: 'lANcElOT',
        success: req.flash('success').toString(),
        error: req.flash('error').toString(),
        post: []
    })
}
});
//ajax方法下只能使用multer
router.post('/', upload.single('postimg'), function(req, res, next) {
        Post.find({}).count(function(err,count){
        var ansNum = count + 1;
        var fields = req.body;
        //console.log(req);
        var file = req.file;
        var title = fields.title;
        var author = fields.username;
        var article = fields.article;
        var abstract = fields.abstract;
        var firstView = fields.firstView;
        var tag = fields.tag;
        var type = fields.type;
        var postImg = null;
        //清除空元素
        for(var i = 0 ; i < tag.length ; i++){
            if(tag[i] == ''){
                tag.splice(i,1);
                i--;
                console.log(1);
            }
        }
        //当req.file.size = 0时默认没有封面图片
        //注意缺省值在此处，过滤器在multer中
        if(typeof(file) != "undefined"){
        if(file.size != 0 && file.mimetype != 'image/png' && file.mimetype != 'image/jpeg' && file.mimetype != 'image/gif' && file.mimetype != 'image/jpg') {
            console.log('上传图片格式错误，只支持png,jpeg,gif');
            res.send('封面格式错误');
            return;
        }
    }else{
        postimg = null;
    }
    console.log(postimg);
        if(title == ""){
            res.send('请输入标题');
            return;
        }
        if(author == ""){
            res.send('请输入作者');
            return;
        }
        var viewNum = 0;
        var post = new Post({
            title: title,
            author: author,
            article: article,
            postImg: postimg,
            publishTime: moment(new Date()).format('YYYY-MM-DD').toString(),
            viewNum: viewNum,
            firstView: firstView,
            abstract: abstract,
            type: type,
            tag: tag,
            ansNum: ansNum
        });
        post.save(function(err) {
            if(err) {
                console.log('文章发表出现错误');
                res.send('服务器炸啦');
                return;
            }
            console.log('文章录入成功');
            //此时在页面进行跳转
            //ajax下不通过后台跳转
            res.send("1");
        });
        });
});

module.exports = router;