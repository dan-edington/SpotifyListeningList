const passport = require('passport');
const queryString = require('query-string');
const fetch = require('node-fetch');
const config = require('../config');

module.exports = (App) => {

  App.get(`${config.serverRoot}/search`, (req, res) => {

    const queryString = `q=${req.query.q}&limit=${req.query.limit}&type=${req.query.type}`;

    fetch(`https://api.spotify.com/v1/search?${queryString}`,
      {
        method: 'get',
        headers: {
          Authorization: `Bearer ${global.spotifyAccessToken}`
        }
      })
      .then(response => response.json())
      .then(response => res.send(response))
      .catch(error => res.send(error));

  });

};