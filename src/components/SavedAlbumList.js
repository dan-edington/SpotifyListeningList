import React, { Component } from 'react';
import styled from 'styled-components';
import SavedAlbum from './SavedAlbum';

const SavedAlbums = styled.ul`
  display: block;
  width: 90%;
  margin: 20px auto 0 auto;
  padding: 0;
`;

class SaveAlbumList extends Component {

  render() {

    const albumCount = Object.keys(this.props.savedAlbums).length;
    const albums = [];
    for (let i = 0; i < albumCount; i++) {

      albums.push(
        <SavedAlbum
          key={i}
          albumID={i}
          albumData={this.props.savedAlbums[i]}
          deleteAlbum={this.props.deleteAlbum}
        />
      );

    }

    return (
      <SavedAlbums>
        {albums}
      </SavedAlbums>
    );

  }

}

export default SaveAlbumList;
