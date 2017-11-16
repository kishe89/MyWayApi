let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let Log = require('./model/Log.js');
let ErrorLog = require('./model/ErrorLog');
let Logger = require('./util/logger');
let index = require('./routes/index');
let users = require('./routes/users');

let app = express();
let mongoose = require('mongoose');
let Initializer = require('./init/Initializer');
Initializer.InitMongoDB(process.env,mongoose);

// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');

app.use(function (req, res, next) {
    let LogObject=Logger.reqgenerator(req);
    let log = new Log({
        userAgent: LogObject.userAgent,
        ip: LogObject.ip,
        originalUrl: LogObject.originalUrl,
        protocol: LogObject.protocol,
        date: LogObject.date,
        method: LogObject.method,
        ApplicationId: LogObject.ApplicationId
    });
    log.save(function (err, result) {
        if(err) {
            console.log(err);
        }
        console.log(result);
    });
    next();
});
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use (function (req, res, next) {
    if (req.secure) {
        // request was via https, so do no special handling
        // console.log('https:// Requested');
        next();
    } else {
        // request was via http, so redirect to https
        console.log('http:// Requested so redirected https://');
        //res.redirect('https://' + req.headers.host + req.url);
        next();
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
    let LogObject=Logger.resgenerator(req,res);
    let log = new ErrorLog({
        userAgent: LogObject.userAgent,
        ip: LogObject.ip,
        originalUrl: LogObject.originalUrl,
        protocol: LogObject.protocol,
        date: LogObject.date,
        method: LogObject.method,
        ApplicationId: LogObject.ApplicationId,
        resStatusCode:LogObject.resStatusCode,
        resLocals:LogObject.resLocals
    });
    log.save(function (err, result) {
        if(err) {
            console.log(err);
        }
        console.log(result);
    });
    res.render('error');
});

module.exports = app;
