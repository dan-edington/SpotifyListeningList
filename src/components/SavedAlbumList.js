import React from 'react';
import styled from 'styled-components';
import SavedAlbum from './SavedAlbum';

const SavedAlbums = styled.ul`
  display: block;
  width: 90%;
  margin: 20px auto 0 auto;
  padding: 0;
`;

const SavedAlbumList = (props) => {

  const albumCount = Object.keys(props.savedAlbums).length;
  const albums = [];

  for (let i = 0; i < albumCount; i++) {

    albums.push(
      <SavedAlbum
        key={i}
        albumID={i}
        albumData={props.savedAlbums[i]}
        deleteAlbum={props.deleteAlbum}
      />
    );

  }

  return (
    <SavedAlbums>
      {albums}
    </SavedAlbums>
  );

};

export default SavedAlbumList;
