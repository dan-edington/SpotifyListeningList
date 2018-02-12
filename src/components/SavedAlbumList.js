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

  const albumCount = props.savedAlbums.albums ? Object.keys(props.savedAlbums.albums).length : 0;

  if(albumCount > 0) {

    const albums = [];

    for (let i = 0; i < albumCount; i++) {
  
      albums.push(
        <SavedAlbum
          key={i}
          albumID={props.savedAlbums.albums[i]._id}
          albumData={props.savedAlbums.albums[i]}
          deleteAlbum={props.deleteAlbum}
        />
      );
  
    }

    return (
      <SavedAlbums>
        {albums}
      </SavedAlbums>
    );

  } else {

    return null;

  }

};

export default SavedAlbumList;
