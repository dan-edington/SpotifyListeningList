import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import SavedAlbumList from './components/SavedAlbumList';

const Heading = styled.h1`
  color: #fff;
  padding: 20px 10px;
  margin: 0;
  font-size: 1.5em;
  text-align: center;
`;

class App extends Component {

  render() {

    return (
      <Fragment>
        <Heading>Spotify To-Listen-To</Heading>
        <SearchBar />
        <SavedAlbumList />
      </Fragment>
    );

  }

}

export default App;
