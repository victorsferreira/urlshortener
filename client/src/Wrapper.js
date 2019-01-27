import styled from 'styled-components';
import React, { Component } from 'react';
import Alert from 'react-s-alert';

const StyledWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background: rgb(45, 60, 80);
color: rgb(240, 240, 240);
letter-spacing: 1px;
flex-direction: column;

* {
  font-size: 18pt;
}

.url {
  margin-bottom: 50px; 

  input {
    background: none;
    border: none;
    outline: none;
    caret-color: rgb(240, 240, 240);
    color: rgb(240, 240, 240);
  }

  button{
    background: rgb(235, 59, 90);
    border: none;
    padding: 5px 10px;
    color: rgb(240, 240, 240);
    cursor: pointer;
  }
}

.shortUrl{
  display: flex;
  flex-direction: column;

  a, a:active, a:visited{
    color: #3498db;
    font-size: 26pt;
  }

  button{
    border: none;
    background: none;
    font-size: 10pt;
    color: white;
    cursor: pointer;
  }
}

.s-alert-wrapper, .s-alert-wrapper *{
  font-size: 18px
}
`;

export default class Wrapper extends Component {
  render() {
    return (
      <StyledWrapper>
        {this.props.children}
        <Alert stack={{ limit: 3 }} />
      </StyledWrapper>
    );
  }
}