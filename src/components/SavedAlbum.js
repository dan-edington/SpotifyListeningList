import React, { Component } from 'react';
import styled from 'styled-components';

const SavedAlbumItem = styled.li`
  list-style-type: none;
  background-color: #fff;
  border-radius: 15px;
  margin: 0 0 20px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  clear: both;
  width: 100%;
  cursor: pointer;

  >img {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 10px;
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

const DeleteButton = styled.p`
  color: #ff0000;
  margin-right: 10px;
  font-size: 1.5em;
`;

class SaveAlbum extends Component {

  openAlbum() {

    window.open(this.props.albumData.url);

  }

  deleteAlbum(e) {

    e.stopPropagation();
    this.props.deleteAlbum(this.props.albumID);

  }

  render() {

    return (
      <SavedAlbumItem onClick={this.openAlbum.bind(this)}>
        <DeleteButton onClick={this.deleteAlbum.bind(this)}>&#x2716;</DeleteButton>
        <img src={this.props.albumData.artwork} alt={this.props.albumData.name} />
        <AlbumDescriptionContainer>
          <AlbumName>{this.props.albumData.name}</AlbumName>
          <ArtistName>{this.props.albumData.artist}</ArtistName>
        </AlbumDescriptionContainer>
      </SavedAlbumItem>
    );

  }

}

export default SaveAlbum;
