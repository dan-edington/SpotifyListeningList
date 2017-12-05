# Spotify To-Listen-To

Simple React app which consumes the Spotify API to search for albums and add them to a todo list.
Currently, todos are saved in browser localstorage. Will probably update to database storage in the future.

Built using create-react-app so the usual commands apply:

Start a dev build:

```
npm start
```

Start a production build:

```
npm build
```

Prior to running, make sure src/config/SpotifyCredentials.js exists and contains the correct details.