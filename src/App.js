import React, { Component, Fragment } from 'react';
import isequal from 'lodash.isequal';
import styled from 'styled-components';
import CookieBanner from 'react-cookie-banner';
import SearchBar from './components/SearchBar';
import SavedAlbumList from './components/SavedAlbumList';

const Heading = styled.h1`
  color: #fff;
  padding: 20px 10px;
  margin: 0;
  font-size: 1.5em;
  text-align: center;
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

class App extends Component {

  constructor(props) {

    super(props);

    const savedAlbums = this.getSavedAlbums();

    this.state = {
      savedAlbums,
    };

    this.saveAlbum = this.saveAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);

  }

  getSavedAlbums() {

    return JSON.parse(localStorage.getItem('savedAlbums')) || {};

  }

  saveAlbum(albumData) {

    const savedAlbums = { ...this.state.savedAlbums };
    const albumCount = Object.keys(savedAlbums).length;
    let isDuplicate = false;

    for (let i = 0; i < albumCount; i++) {

      if (isequal(this.state.savedAlbums[i], albumData)) {

        isDuplicate = true;
        break;

      }

    }

    if (!isDuplicate) {

      savedAlbums[albumCount] = albumData;

    }

    localStorage.setItem('savedAlbums', JSON.stringify(savedAlbums));

    this.setState({
      savedAlbums: this.getSavedAlbums(),
    });

  }

  deleteAlbum(albumID) {

    const savedAlbums = { ...this.state.savedAlbums };
    const newAlbums = {};
    const albumCount = Object.keys(savedAlbums).length;
    let counter = 0;

    for (let i = 0; i < albumCount; i++) {

      if (i !== albumID) {

        newAlbums[counter] = savedAlbums[i];
        counter += 1;

      }

    }

    this.setState({
      savedAlbums: newAlbums,
    });

    localStorage.setItem('savedAlbums', JSON.stringify(newAlbums));

  }

  render() {

    const msg = 'This site uses cookies. By continuing to use the site, you agree to the use of cookies.';

    return (
      <Fragment>
        <CookieBanner
          message={msg}
        />
        <AppContainer>
          <Heading>Spotify To-Listen-To</Heading>
          <SearchBar
            saveAlbum={this.saveAlbum}
          />
          <SavedAlbumList
            savedAlbums={this.state.savedAlbums}
            deleteAlbum={this.deleteAlbum}
          />
        </AppContainer>
      </Fragment>
    );

  }

}

export default App;
