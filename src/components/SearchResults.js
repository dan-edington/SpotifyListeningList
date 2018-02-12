import React, { Component } from 'react';
import styled from 'styled-components';

class SearchResults extends Component {

  constructor() {

    super();

    this.state = {
      topPos: 0,
    };

    this.handleResultClick = this.handleResultClick.bind(this);

  }

  handleResultClick(e) {

    e.preventDefault();
    const albumID = e.currentTarget.getAttribute('albumid');
    const albumDetails = this.props.searchResults[albumID];
    this.props.saveAlbum(albumDetails);
    this.props.clearSearch();

  }

  componentDidMount() {

    // Calculate position of input and use it to position dropdown
    const searchEl = document.getElementById('SearchBarInput');
    this.setState({
      topPos: window.getComputedStyle(searchEl).getPropertyValue('top'),
    });

  }

  render() {

    const ResultsList = styled.ul`
      position: absolute;
      z-index: 999;
      width: calc(90% - 20px);
      height: auto;
      border-radius: 15px;
      border-top-left-radius: 0px;
      border-top-right-radius: 0px;
      padding: 0;
      margin: 0;
      background-color: #fff;
      display: ${this.props.searchResults.length > 0 && this.props.visibility ? 'block' : 'none'};
      list-style-type: none;
      top: ${this.state.topPos};
      left: calc(5% + 10px);
      box-shadow: 0px 10px 20px #000;
      overflow: hidden;

      >li {
        clear: both;
        display: flex;
        align-items: center;
        border-bottom: 5px solid #fff;
      }

      >li:last-child {
        border-bottom: 0;
      }

      >li:hover {
        background-color: #4286f4
      }

      >li img {
        float: left;
        margin-right: 10px;
      }

      >li p {
        padding: 0;
        margin: 0px 10px 0px 0px;
      }
    `;

    const AlbumDescriptionContainer = styled.div`
      float: left;
    `;

    const AlbumName = styled.p`
      font-size: 1em;
    `;

    const ArtistName = styled.p`
      font-size: 0.8em;
    `;

    const results = this.props.searchResults.map((album, i) => (
      <li key={i} albumid={i} onClick={this.handleResultClick}>
        <img src={album.artwork} alt={album.name} />
        <AlbumDescriptionContainer>
          <AlbumName>{album.name} ({album.type})</AlbumName>
          <ArtistName>{album.artist}</ArtistName>
        </AlbumDescriptionContainer>
      </li>
    ));

    return (
      <ResultsList>
        { results }
      </ResultsList>
    );

  }

}

export default SearchResults;
