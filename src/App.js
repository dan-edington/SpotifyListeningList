import React, { Component, Fragment } from 'react';
import SearchBar from './components/SearchBar';
import SavedAlbumList from './components/SavedAlbumList';

class App extends Component {

  render() {

    return (
      <Fragment>
        <header>
          <h1>Spotify To-Listen-To</h1>
        </header>
        <SearchBar />
        <SavedAlbumList />
      </Fragment>
    );

  }

}

export default App;
