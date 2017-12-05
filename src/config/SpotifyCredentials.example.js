const SpotifyCredentials = {
  production: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
  development: {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
  },
};

export default SpotifyCredentials[process.env.NODE_ENV];
