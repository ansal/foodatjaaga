
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var apis = require('./routes/api.js')
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config.js');
var passport = require('passport');
var mongostore = require('connect-mongo')(express);
var authentications = require('./routes/auth.js');
var ejs = require('ejs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
ejs.open = '{{';
ejs.close = '}}';
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({
  secret: config.sessionSecret,
  store: new mongostore({
    url: config.db,
    collection : 'sessions'
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// 404 handler
app.use(function(req, res, next){
  res.status(404);
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

// Connect to mongodb
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error:'));
db.once('open', function callback () {
  console.log('connected to mongodb - ', config.db);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// setup authentications
authentications(passport, config);
app.get('/auth/login/google', passport.authenticate('google'));
app.get('/auth/callback/google', 
  passport.authenticate('google', { successRedirect: '/',
  failureRedirect: '?loginError=true' })
);

app.get('/', routes.index);

// APIs
app.post('/api/food', apis.CreateFood);
app.post('/api/menu', apis.CreateMenu);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
