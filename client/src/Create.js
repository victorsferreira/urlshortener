import React, { Component } from 'react';
import './App.css';
import Api from './api';
import copy from 'copy-to-clipboard';
import config from './config';
import styled from 'styled-components';
import { errorAlert } from './helpers';
import Wrapper from './Wrapper';

class Create extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      code: null,
      shortUrl: '',

      // url: '',
      // code: 'blablabla',
      // shortUrl: 'http://blablabla.com'
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
      errorAlert('This is not a valid URL');
      return;
    }

    Api.post('', { url })
      .then((response) => {
        const { code } = response.data;
        const shortUrl = this.resolveCodeToUrl(code)
        this.setState({ code, shortUrl });
      })
      .catch((err) => {
        errorAlert('There was an error to create a short URL');
      })
  }

  resolveCodeToUrl(code) {
    return `${config.PUBLIC_URL}/${code}`;
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
            <div className="shortUrl">
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
