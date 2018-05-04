import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import fakeAuth from '../utils/fakeAuth';
import Header from '../components/Header';
import Main from './Main';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header fakeAuth={ fakeAuth } />
          <Main fakeAuth={ fakeAuth } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
