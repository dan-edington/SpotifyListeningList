# Spotify To-Listen-To

React app which consumes the Spotify API to search for albums and add them to a todo list. Users and saved albums are persisted to a MongoDB instance at mlab.com.

Built using create-react-app so the usual commands apply:

Start a dev build:

```
npm start
```

Start a production build:

```
npm build
```

The server is located in src/server. It requires the NODE_ENV variable setting to development prior to running.

Prior to running, ensure the app config (src/config/index.js) and server config (src/server/config/index.js) are set up properly.