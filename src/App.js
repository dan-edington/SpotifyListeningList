import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import CookieBanner from 'react-cookie-banner';
import SearchBar from './components/SearchBar';
import SavedAlbumList from './components/SavedAlbumList';
import AuthButton from './components/AuthButton';
import * as albumService from './services/album';
import * as authService from './services/auth';

const Heading = styled.h1`
  color: #fff;
  padding: 20px 10px;
  margin: 0;
  font-weight: normal;
  font-size: 2em;
  text-align: center;
`;

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

class App extends Component {

  constructor() {

    super();

    const savedAlbums = [];

    this.state = {
      savedAlbums,
      loggedIn: false,
    };

    this.saveAlbum = this.saveAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);

  }

  async componentDidMount() {

    const loggedIn = await authService.isUserLoggedIn();
    this.setState({ loggedIn });

    if(this.state.loggedIn) {
      this.getSavedAlbums();
    }

  }

  async getSavedAlbums() {

    const savedAlbums = await albumService.getAlbums();
    this.setState({ savedAlbums });

  }

  saveAlbum(albumDetails) {

    albumService.saveAlbum(albumDetails)
      .then(response => {
        if(response.success) {
          this.getSavedAlbums();
        }
      });

  }

  deleteAlbum(id) {

    albumService.deleteAlbum(id)
      .then(response => {
        if(response.success) {
          this.getSavedAlbums();
        }
      });

  }

  renderAppIfLoggedIn() {

    if(this.state.loggedIn) {

      return(
        <Fragment>
          <SearchBar
            saveAlbum={ this.saveAlbum }
          />
          <SavedAlbumList
            savedAlbums={ this.state.savedAlbums }
            deleteAlbum={ this.deleteAlbum }
          />
        </Fragment>
      );

    }

  }

  render() {

    const msg = 'This site uses cookies.';

    return (
      <Fragment>
        <AppContainer>
        <CookieBanner message={msg} />          
          <Heading>Spotify Listening List</Heading>
          <AuthButton
            loggedIn={this.state.loggedIn}
          />
          { this.renderAppIfLoggedIn() }
        </AppContainer>
      </Fragment>
    );

  }

}

export default App;
