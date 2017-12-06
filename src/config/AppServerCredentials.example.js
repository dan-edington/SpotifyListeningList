const AppServerCredentials = {
  production: {
    serverURL: '',
  },
  development: {
    serverURL: '',
  },
};

export default AppServerCredentials[process.env.NODE_ENV];
