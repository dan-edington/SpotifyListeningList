const queryString = require('query-string');
const btoa = require('btoa');
const fetch = require('node-fetch');
const config = require('../config');

const getSpotifyAuthToken = () => {

  return new Promise((resolve, reject) => {

    const authString = btoa(unescape(encodeURIComponent(`${config.keys.clientID}:${config.keys.clientSecret}`)));

    const spotifyToken = fetch('https://accounts.spotify.com/api/token', {
      method: 'post',
      headers: {
        Authorization: `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: queryString.stringify({
        grant_type: 'client_credentials',
      }),
    })
    .then(response => response.json())
    .then(response => {
      resolve(response);
    });

  });

};

const startSpotifyTokenService = () => {

  const getTokenAndSetTimeout = () => {

    getSpotifyAuthToken()
      .then(response => {
        global.spotifyAccessToken = response.access_token;
        setTimeout(getTokenAndSetTimeout, Math.floor(response.expires_in * 0.9) * 1000);
      });

  };

  getTokenAndSetTimeout();

}

module.exports = { startSpotifyTokenService };