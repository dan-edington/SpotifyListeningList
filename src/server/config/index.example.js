const AppCredentials = {
  callbackURL: {
    production: '',
    development: '',
  },
  appClientURL: {
    production: '',
    development: ''
  },
  keys: {
    clientID: '',
    clientSecret: '',
  },
};

const DBCredentials = {
  username: '',
  password: '',
  URI: '',
}

const serverConfig = {
  port: 3001,
}

const cookieKey = '';

const config = {
  callbackURL: AppCredentials.callbackURL[process.env.NODE_ENV],
  appClientURL: AppCredentials.appClientURL[process.env.NODE_ENV],
  keys: AppCredentials.keys,
  port: serverConfig.port,
  DBCredentials,
  cookieKey,
};

module.exports = config;