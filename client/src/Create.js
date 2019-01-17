import React, { Component } from 'react';
import './App.css';
import Api from './api';

class Create extends Component {
  constructor() {
    super();

    this.state = {
      url: '',
      shortUrl: ''
    }
  }

  urlHandler = (e) => {
    const { value } = e.target;
    this.setState({ url: value });
  }

  shortenUrl = () => {
    Api.post('', { url: this.state.url })
    .then((response) => {
      const { shortUrl } = response.data;
      this.setState({ shortUrl });
    });
  }

  render() {
    return (
      <div className="Create">
        <input placeholder="Your URL goes here" onChange={this.urlHandler} />
        <button onClick={this.shortenUrl}>Shorten it!</button>
        <div>{this.state.shortUrl}</div>
      </div>
    );
  }
}

export default Create;
