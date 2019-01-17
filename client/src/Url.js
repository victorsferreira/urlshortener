import React, { Component } from 'react';
import './App.css';
import Api from './api';

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }

  componentDidMount() {
    const { shortUrl } = this.props.match.params;
    Api.get(shortUrl)
      .then((response) => {
        const { url } = response.data;
        window.location.href = url;
      });
  }

  render() {
    return this.state.error ? (
      <div>URL couldn't be translated</div>
    ) : (
        <div>Loading...</div>
      );
  }
}

export default App;
