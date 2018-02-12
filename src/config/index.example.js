const serverURLs = {
  production: '',
  development: '',
}

export default {
  serverBaseURL: serverURLs[process.env.NODE_ENV]
}