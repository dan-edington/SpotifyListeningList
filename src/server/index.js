const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const config = require('./config');
const spotifyService = require('./services/spotify');
require('./models/User');
require('./services/passport');

mongoose.connect(`mongodb://${config.DBCredentials.username}:${config.DBCredentials.password}@${config.DBCredentials.URI}`);

const App = express();

global.spotifyAccessToken = '';

App.use(function(req, res, next) {

  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  
  next();

});

App.use(bodyParser.json());

App.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [config.cookieKey]
}));
App.use(passport.initialize());
App.use(passport.session());

require('./routes')(App);

App.listen(config.port, () => {

  console.log('Listening...');

});

spotifyService.startSpotifyTokenService();