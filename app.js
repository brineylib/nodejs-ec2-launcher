
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var instances = require('./routes/instances');
var http = require('http');
var path = require('path');

var passport = require('passport');
var util = require('util');
var BrowserIDStrategy = require('passport-browserid').Strategy;

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session.  Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.  However, since this example does not
// have a database of user records, the BrowserID verified email address
// is serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  done(null, { email: email });
});


// Use the BrowserIDStrategy within Passport.
// Strategies in passport require a `validate` function, which accept
// credentials (in this case, a BrowserID verified email address), and invoke
// a callback with a user object.
passport.use(new BrowserIDStrategy({
    //Explicitly specify the Persona audience parameter
    //You shall not trust the Host header sent by the user's browser!!
    audience: (process.env.PERSONA_AUDIENCE || 'http://localhost:3000')
  },
  function(email, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's email address is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the email address with a user record in your database, and
      // return that user instead.
      return done(null, { email: email })
    });
  }
));

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.set('layout', 'layout'); // use layout.html as the default layout
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/instances', ensureAuthenticated, instances.list);
//app.get('/instances', instances.list);

app.get('/instances/:id', ensureAuthenticated, instances.list);
//app.get('/instances/:id', instances.list);

// POST /auth/persona
// Use passport.authenticate() as route middleware to authenticate the
// request. BrowserId authentication will verify the assertion obtained from
// the browser via the JavaScript API.
app.post('/auth/persona', 
  passport.authenticate('browserid', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/instances');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
