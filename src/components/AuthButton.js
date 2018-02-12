import React from 'react';
import styled from 'styled-components';
import config from '../config';

const AuthButtonElement = styled.button`
  padding: 1em 2em;
  color: #fff;
  background-color: #1db954;
  border: 0;
  border-radius: 2em;
  font-weight: bold;
  margin: 0 auto 2em auto;
  display: block;
  cursor: pointer;
  outline: none;
`;

const AuthButton = (props) => {

  const handleClick = () => {
    
    if(props.loggedIn) {
      window.location.href = `${config.serverBaseURL}/auth/logout`;
    } else {
      window.location.href = `${config.serverBaseURL}/auth/login`;
    }

  };

  return(
    <AuthButtonElement onClick={handleClick}>
      {props.loggedIn ? 'Logout' : 'Login'}
    </AuthButtonElement>
  )

}

export default AuthButton;