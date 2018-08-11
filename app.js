var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var regRouter = require('./routes/reg');
var postRouter = require('./routes/post');
var blogRouter = require('./routes/blog');
var articleRouter = require('./routes/article');
var archiveRouter = require('./routes/archives');
var sortRouter = require('./routes/sort');
var config = require('./config/config');
var MongoStore = require('connect-mongo')(session);
var moment = require('moment');
var formidable = require('formidable');

var Post = require('./models/postmodel');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port',process.env.PORT || 80 || 3000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
  secret: config.cookieSecret,
  key: config.db,
  store: new MongoStore({url:'mongodb://localhost/lanceBlog'}),
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true,
}));


app.use('/', indexRouter);
/*app.use('/users', usersRouter);
//封闭注册页
app.use('/reg', regRouter);*/
app.use('/post', postRouter);
app.use('/blog', blogRouter);
app.use('/article', articleRouter);
app.get('/loginout',function(req,res){
  req.session.user = null;
  res.redirect('/');
});
app.get('/del',function(req,res){
  if(req.session.user != null && req.session.user.username != "lANcElOTA"){
    res.redirect('/blog')
  }else{
  if(req.query != null){
    var id = req.query.id;
    Post.findByIdAndRemove(id,function(err,data){
      var removeAns = data.ansNum;
      //模拟,将所有Ans大于被删除的全部减一
      Post.update({"ansNum":{$gte:removeAns}},{$inc:{"ansNum":-1}});
      res.redirect('/blog');

    });
  }else{
    res.redirect('/blog')
  }
}
});
app.use('/archives',archiveRouter);
app.use('/tags',sortRouter);
//set flash
app.use(function(req,res,next){
	res.locals.errors = req.flash('error');
	res.locals.infos = req.flash('info');
	next();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//接口
module.exports = app;
