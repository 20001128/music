var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var listenRouter = require('./routes/listen');
var loginRouter = require('./routes/login');
var singerRouter = require('./routes/singer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,limit:'3072kb'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//处理跨域
app.all('*', function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");  //跨域必须设置的请求头
 res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
 res.header("Content-Type", "application/json;charset=utf-8");
 res.header("Access-Control-Allow-Headers", "content-type");
 //添加时间截，阻止二次请求（304）
 res.header("X-Powered_By", "3.2.1");
 res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  return next();
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/search',searchRouter);
app.use('/listen',listenRouter);
app.use('/login',loginRouter);
app.use('/singer',singerRouter);

//处理webpack服务请求
// app.get('/__webpack_hmr', function(req, res) {
//   res.send('')
// });
app.use("*", function(request, response, next) {
    response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
    return next();
});

app.use(cors({
    origin:['http://192.168.43.19:8090'],
    methods:['GET','POST'],
    alloweHeaders:['Conten-Type', 'Authorization']
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = app;
