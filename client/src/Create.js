import React, { Component } from 'react';
import './App.css';
import Api from './api';
import copy from 'copy-to-clipboard';
import config from './config';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(45, 60, 80);
  color: rgb(240, 240, 240);
  letter-spacing: 1px;

  * {
    font-size: 18pt;
  }

  .url {
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
`;

class Create extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      code: null,
      shortUrl: ''
    }
  }

  urlHandler = (e) => {
    const { value } = e.target;
    this.setState({ url: value });
  }

  checkUrl(input) {
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g;
    return !!input.match(pattern);
  }

  createShortUrl = () => {
    const cleanUrl = this.state.url.replace(/http:\/\//g, '');
    const url = `http://${cleanUrl}`;

    if (!this.checkUrl(url)) {
      alert('Url is not valid');
      return;
    }

    Api.post('', { url })
      .then((response) => {
        const { code } = response.data;
        const shortUrl = this.resolveCodeToUrl(code)
        this.setState({ code, shortUrl });
      });
  }

  resolveCodeToUrl(code) {
    return `${config.PUBLIC_URL}/#/${code}`;
  }

  copyToClipboard = () => {
    copy(this.state.shortUrl);
  }

  render() {
    return (
      <Wrapper className="Create">
        <div className="url">
          <span className="http">http://</span>
          <input placeholder="Your URL goes here" onChange={this.urlHandler} />
          <button onClick={this.createShortUrl}>Shorten it!</button>
        </div>
        {
          this.state.shortUrl && (
            <div>
              <a href={this.state.shortUrl}>{this.state.shortUrl}</a>
              <button onClick={this.copyToClipboard}>Copy to clipboard</button>
            </div>
          )
        }
      </Wrapper>
    );
  }
}

export default Create;
