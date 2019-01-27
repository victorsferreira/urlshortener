import React, { Component } from 'react';
import './App.css';
import Api from './api';
import { errorAlert } from './helpers';
import styled from 'styled-components';

import Wrapper from './Wrapper';

class App extends Component {
  constructor() {
    super();

    this.state = {

    };
  }

  componentDidMount() {
    const { shortUrl } = this.props.match.params;
    Api.get(shortUrl)
      .then((response) => {
        const { url } = response.data;
        window.location.href = url;
      })
      .catch(() => {
        errorAlert('Cannot load this URL');
      })
  }
  
  render() {
    return (
      <Wrapper className="Url">
        <div>Loading...</div>
      </Wrapper>
    );
  }
}

export default App;
