const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const mongoose = require('mongoose');
const config = require('../config');

const User = mongoose.model('users');

const SpotifyAppStrategy = new SpotifyStrategy(
  {
    clientID: config.keys.clientID,
    clientSecret: config.keys.clientSecret,
    callbackURL: config.callbackURL,
  },
  async (accessToken, refreshToken, expires_in, profile, done) => { 

    let theUser = await User.findOne({ spotifyID: profile.id });
   
    if(!theUser) {

      theUser = await new User({
        spotifyID: profile.id
      }).save();

    }

    done(null, theUser);

  },
);

passport.serializeUser((user, done) => {

  done(null, user.id);

});

passport.deserializeUser(async (id, done) => {

  const user = await User.findById(id);
  done(null, user);

});

passport.use(SpotifyAppStrategy);