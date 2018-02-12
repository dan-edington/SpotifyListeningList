import React from 'react';
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

const SaveAlbum = (props) => {

  const openAlbum = () => {

    window.open(props.albumData.albumURL);

  };

  const deleteAlbum = (e) => {

    e.stopPropagation();
    props.deleteAlbum(props.albumID);

  };

  return (
    <SavedAlbumItem onClick={openAlbum}>
      <DeleteButton onClick={deleteAlbum}>&#x2716;</DeleteButton>
      <img src={props.albumData.artworkURL} alt={props.albumData.name} />
      <AlbumDescriptionContainer>
        <AlbumName>{props.albumData.name} ({props.albumData.type})</AlbumName>
        <ArtistName>{props.albumData.artist}</ArtistName>
      </AlbumDescriptionContainer>
    </SavedAlbumItem>
  );

};

export default SaveAlbum;
