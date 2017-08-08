var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('plcent');
var index = require('./routes/index');
var movie = require('./routes/movie');

var app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname, 'modules')]);
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 默认 app
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/modules',express.static(path.join(__dirname, 'modules')));

app.use('/bower_components',express.static(path.join(__dirname, 'bower_components/')));
// dist APP
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// 路由
app.use('/', index);
app.use('/v2/movie', movie);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
