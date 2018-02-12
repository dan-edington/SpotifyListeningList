const passport = require('passport');
const config = require('../config');
const mongoose = require('mongoose');

const Users = mongoose.model('users');

module.exports = (App) => {

  App.delete(`${config.serverRoot}/album`, (req, res) => {

    const query = { _id: req.user.id };
    const operation = { $pull: { albums: { _id: req.query.id } }};

    Users.findOneAndUpdate(query, operation)
      .then(response => {
        res.send({
          success: true,
          id: req.user.id,
        });
      })
      .catch(error => {
        res.send({
          success: false,
          error
        });
      });

  });

  App.post(`${config.serverRoot}/album`, (req, res) => {

    const album = {
      name: req.body.name,
      artist: req.body.artist,
      type: req.body.type,
      artworkURL: req.body.artwork,
      albumURL: req.body.url,
    };

    const query = { _id: req.user.id };
    const operation = { $push: { albums: album }};

    Users.findOneAndUpdate(query, operation)
      .then(response => {
        res.send({
          album,
          success: true,
        });
      })
      .catch(error => {
        res.send({
          success: false,
          error
        });
      });

  });

  App.get(`${config.serverRoot}/album`, (req, res) => {

    const query = { _id: req.user.id };

    Users.findOne(query)
      .then(response => {
        res.send(response);
      })
      .catch(error => res.send(error));

  });

};