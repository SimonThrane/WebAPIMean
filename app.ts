declare var require, module, process, __dirname;
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as passport from 'passport';
require('./app_server/models/db');
require('./app_server/config/passport');
import * as programs from './app_server/routes/programs';
import * as exercises from './app_server/routes/exercises';
import * as users from './app_server/routes/users';
var jwt = require('express-jwt');

var app = express();

let token = "secret";
if (process.env.NODE_ENV === 'production') {
	token = process.env.JWT_SECRET;
}

var auth = jwt({
    secret: token,
    userProperty: 'payload'
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/programs' as any, programs as any);
app.use('/exercises' as any, auth, exercises as any);
app.use('/auth' as any, users as any);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  next(err);
});

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.sendStatus(500);
});

export = app;
