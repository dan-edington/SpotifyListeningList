import React, { Fragment, Component } from 'react';
import throttle from 'lodash.throttle';
import axios from 'axios';
import qs from 'qs';
import styled from 'styled-components';
import SpotifyCredentials from '../config/SpotifyCredentials';
import SearchResults from './SearchResults';

const SearchBarInput = styled.input`
  margin: 0 auto;
  width: 90%;
  height: 25px;
  display: block;
  border-radius: 15px;
  border: 1px solid #fff;
  outline: none;
  text-align: center;
`;

const searchBarID = 'SearchBarInput';

class SearchBar extends Component {

  constructor(props) {

    super(props);
    // Create a throttled version of this.albumSearch to keep HTTP requests down
    this.throttledSearch = throttle(this.doAlbumSearch.bind(this), 500);
    this.accessToken = null;

    this.state = {
      searchValue: '',
      searchResults: [],
    };

  }

  /**
   * Request Access Token from Spotify API and return it via a promise
   */
  requestAccessToken() {

    return new Promise((resolve, reject) => {

      const authString = btoa(unescape(encodeURIComponent(`${SpotifyCredentials.clientID}:${SpotifyCredentials.clientSecret}`)));

      axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
          grant_type: 'client_credentials',
        }),
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
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
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          q: this.state.searchValue,
          type: 'album',
          limit: 5,
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

    const searchValue = e.target.value.trim();
    this.setState({ searchValue });

    const now = new Date().getTime();
    const accessTokenExpiresAt = parseInt(sessionStorage.getItem('accessTokenExpiresAt'), 10);

    if (now >= accessTokenExpiresAt) {

      this.setAccessToken();
      return;

    }

    if (this.state.searchValue && this.state.searchValue !== '') {

      this.throttledSearch();

    } else if (this.state.searchValue === '') {

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
          defaultValue={this.state.searchValue}
          value={this.state.searchValue}
          onChange={this.handleChange.bind(this)}
          id={searchBarID}
          ref={searchBarID}
        />
        <SearchResults
          clearSearch={this.clearSearch.bind(this)}
          searchResults={this.state.searchResults}
          searchBarID={searchBarID}
        />
      </Fragment>
    );

  }

}

export default SearchBar;
