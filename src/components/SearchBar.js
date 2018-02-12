import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import queryString from 'query-string';
import styled from 'styled-components';
import config from '../config';
import SearchResults from './SearchResults';

const searchBarID = 'SearchBarInput';

const SearchContainer = styled.div`
  position: relative;
`;

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

  constructor() {

    super();

    // Create a throttled version of this.albumSearch to keep HTTP requests down
    this.throttledSearch = throttle(this.doAlbumSearch.bind(this), 250);
    this.accessToken = null;

    this.state = {
      searchValue: '',
      searchResults: [],
      dropDownVisible: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

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

  doAlbumSearch() {

    const searchResults = [];

    if (this.state.searchValue && this.state.searchValue !== '') {

      const URLParams = queryString.stringify({
        q: this.state.searchValue,
        type: 'album',
        limit: 5,
      });

      fetch(`${config.serverBaseURL}/search?${URLParams}`, { credentials: 'include' })
        .then(response => response.json())
        .then(response => {

          const searchResults = response.albums.items.map(album => {
            return {
              type: album.album_type,
              name: album.name,
              artist: album.artists[0].name,
              artwork: album.images[2].url,
              url: album.external_urls.spotify,
            }
          });

          this.setState({ searchResults });

        });

    } else {

      this.setState({ searchResults });

    }

  }

  handleChange(e) {

    const searchValue = e.target.value;
    this.setState({ searchValue });

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
      <SearchContainer>
        <SearchBarInput type="text"
          value={this.state.searchValue}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          id={searchBarID}
          ref={searchBarID}
        />
        <SearchResults
          clearSearch={this.clearSearch}
          searchResults={this.state.searchResults}
          searchBarID={searchBarID}
          saveAlbum={this.props.saveAlbum}
          visibility={this.state.dropDownVisible}
        />
      </SearchContainer>
    );

  }

}

export default SearchBar;
