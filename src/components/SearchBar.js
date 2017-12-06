import React, { Fragment, Component } from 'react';
import throttle from 'lodash.throttle';
import axios from 'axios';
import styled from 'styled-components';
import AppServerCredentials from '../config/AppServerCredentials';
import SearchResults from './SearchResults';

const searchBarID = 'SearchBarInput';

const SearchBarInput = styled.input`
  margin: 0 auto;
  width: 90%;
  height: 25px;
  display: block;
  border-radius: 15px;
  border: 1px solid #fff;
  outline: none;
  text-align: center;
  font-size: 1em;
`;

class SearchBar extends Component {

  constructor(props) {

    super(props);
    // Create a throttled version of this.albumSearch to keep HTTP requests down
    this.throttledSearch = throttle(this.doAlbumSearch.bind(this), 250);
    this.accessToken = null;

    this.state = {
      searchValue: '',
      searchResults: [],
      dropDownVisible: false,
    };

  }

  handleBlur() {

    // Added a short timeout so dropdown can still receive click event if blur happens that way
    setTimeout(() => {

      this.setState({ dropDownVisible: false });

    }, 100);

  }

  handleFocus() {

    this.setState({ dropDownVisible: true });

  }

  /**
   * Request Access Token from Spotify API and return it via a promise
   */
  requestAccessToken() {

    return new Promise((resolve, reject) => {

      axios({
        method: 'post',
        url: `${AppServerCredentials.serverURL}/spotify/getAuthToken`,
        data: {
          appName: 'SPOTIFY_LISTENINGLIST',
        },
      }).then((response) => {

        resolve(response.data);

      });

    });

  }

  /**
   * Tests whether an access token is required.
   * Requests one if need be then sets the object's accessToken property
   * @param  { bool } force=false - Forces the request of a new Access Token
   */
  setAccessToken(force = false) {

    const now = new Date().getTime();
    const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);
    const accessToken = sessionStorage.getItem('accessToken');

    if (!accessToken || !accessTokenExpiresAt || now >= accessTokenExpiresAt || force) {

      console.log('Requesting new auth token from spotify...');

      this.requestAccessToken()
        .then((response) => {

          sessionStorage.setItem('accessToken', response.access_token);
          sessionStorage.setItem('accessTokenExpiresAt', new Date().getTime() + (parseInt(response.expires_in, 10) * 1000)); // Expires_in returns a value in seconds so multiply by 1000 to get ms
          this.accessToken = sessionStorage.getItem('accessToken');

        });

    } else {

      this.accessToken = accessToken;

    }

  }

  componentWillMount() {

    this.setAccessToken();

  }

  /**
   *  Perform search, parse data and update state
   *  Only perform search if the search string is not empty
   */
  doAlbumSearch() {

    const searchResults = [];

    if (this.state.searchValue && this.state.searchValue !== '') {

      axios({
        method: 'get',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: this.state.searchValue,
          type: 'album',
          limit: 5,
        },
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }).then((response) => {

        response.data.albums.items.forEach((album) => {

          searchResults.push({
            name: album.name,
            artist: album.artists[0].name,
            artwork: album.images[2].url,
            url: album.external_urls.spotify,
          });

        });

        this.setState({ searchResults });

      });

    } else {

      this.setState({ searchResults });

    }

  }

  /**
   * Checks token has expired and either requests a new token or runs the search (throttled)
   * @param  { object } e - Event object
   */
  handleChange(e) {

    const searchValue = e.target.value;
    this.setState({ searchValue });

    const now = new Date().getTime();
    const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);

    if (now >= accessTokenExpiresAt) {

      this.setAccessToken();
      return;

    }

    if (this.state.searchValue && this.state.searchValue !== '') {

      this.throttledSearch();

    } else if (this.state.searchValue === '' || !this.state.searchValue) {

      this.setState({
        searchResults: [],
      });

    }

  }

  clearSearch() {

    this.setState({
      searchResults: [],
      searchValue: '',
    });

  }

  render() {

    return (
      <Fragment>
        <SearchBarInput type="text"
          value={this.state.searchValue}
          onChange={this.handleChange.bind(this)}
          onFocus={this.handleFocus.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          id={searchBarID}
          ref={searchBarID}
        />
        <SearchResults
          clearSearch={this.clearSearch.bind(this)}
          searchResults={this.state.searchResults}
          searchBarID={searchBarID}
          saveAlbum={this.props.saveAlbum}
          visibility={this.state.dropDownVisible}
        />
      </Fragment>
    );

  }

}

export default SearchBar;
