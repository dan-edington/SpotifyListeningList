import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, injectGlobal } from 'styled-components';
import App from './App';

injectGlobal([`

* {
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  background: #565656;
  font-family: sans-serif;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 16px;
}

`]);

const theme = {};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  , document.getElementById('root'));
