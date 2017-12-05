import React, { Component } from 'react';

class SearchResults extends Component {

  handleResultClick(e) {

    e.preventDefault();
    const albumID = e.currentTarget.getAttribute('albumid');
    console.log(this.props.searchResults[albumID]);
    this.props.clearSearch();

  }

  render() {

    const results = this.props.searchResults.map((album, i) => (
      <li key={i} albumid={i} onClick={this.handleResultClick.bind(this)}>
        <img src={album.artwork} alt={album.name} />
        <p>{album.artist} - {album.name}</p>
      </li>
    ));

    return (
      <ul>
        { results }
      </ul>
    );

  }

}

export default SearchResults;
