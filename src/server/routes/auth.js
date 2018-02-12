const passport = require('passport');
const config = require('../config');

module.exports = (App) => {

  App.get(`${config.serverRoot}/auth/login`,
    passport.authenticate('spotify', { scope: ['user-read-email', 'user-read-private'], showDialog: true }));

  App.get(`${config.serverRoot}/auth/callback`,
    passport.authenticate('spotify', { failureRedirect: config.appClientURL }),
    (req, res) => {
      res.redirect(config.appClientURL);
    }
  );

  App.get(`${config.serverRoot}/auth/logout`, (req, res) => {
    req.logout();
    res.redirect(config.appClientURL);
  });

  App.get(`${config.serverRoot}/auth/user`, (req, res) => {

    if(req.user) {
      res.send(req.user);
    } else {
      res.send({});
    }

  });

};