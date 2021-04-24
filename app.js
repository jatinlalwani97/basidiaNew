const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const cookieParser = require('cookie-parser');
const logger = require('./logger');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const friendRouter = require('./routes/friend');
const {returnErrorObject, returnNotFoundObject} =require('./constants');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan(function(tokens, req, res) {
  return JSON.stringify({
    'remote-address': tokens['remote-addr'](req, res),
    'time': tokens['date'](req, res, 'iso'),
    'method': tokens['method'](req, res),
    'url': tokens['url'](req, res),
    'http-version': tokens['http-version'](req, res),
    'status-code': tokens['status'](req, res),
    'content-length': tokens['res'](req, res, 'content-length'),
    'referrer': tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
  });
}, {stream: logger.stream}));

app.use(cookieParser());
app.use(express['static'](path.join(__dirname, 'public')));


app.use('/api/post', postRouter);
app.use('/api/profile', profileRouter);
app.use('/api/request', requestRouter);
app.use('/api/friend', friendRouter);

app.use(function(req, res, next) {
  return res.status(404).send(returnNotFoundObject());
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  return res.status(500).send(returnErrorObject());
});


module.exports = app;


