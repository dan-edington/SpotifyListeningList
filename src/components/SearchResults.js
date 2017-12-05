import React, { Component } from 'react';
import styled from 'styled-components';

class SearchResults extends Component {

  constructor(props) {

    super(props);
    this.state = {
      topPos: 0,
    }

  }

  handleResultClick(e) {

    e.preventDefault();
    const albumID = e.currentTarget.getAttribute('albumid');
    console.log(this.props.searchResults[albumID]);
    this.props.clearSearch();

  }

  componentDidMount() {

    const searchEl = document.getElementById('SearchBarInput');
    this.setState({
      topPos: window.getComputedStyle(searchEl).getPropertyValue('top')
    });

  }

  render() {

    const ResultsList = styled.ul`
      position: absolute;
      z-index: 999;
      width: 90%;
      height: 50%;
      max-height: 340px;
      border-radius: 15px;
      padding: 0;
      margin: 0;
      background-color: #fff;
      display: ${this.props.searchResults.length > 0 ? 'block' : 'none'};
      list-style-type: none;
      top: ${this.state.topPos};
      left: 5%;
      overflow: scroll;
      
      :hover {
        background-color: #4286f4
      }

      >li {
        clear: both;
        display: flex;
        align-items: center;
        border-bottom: 5px solid #fff;
      }

      >li:last-child {
        border-bottom: 0;
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
      <li key={i} albumid={i} onClick={this.handleResultClick.bind(this)}>
        <img src={album.artwork} alt={album.name} />
        <AlbumDescriptionContainer>
          <AlbumName>{album.name}</AlbumName>
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
