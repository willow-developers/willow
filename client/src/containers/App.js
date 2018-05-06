import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import fakeAuth from '../utils/fakeAuth';
import Header from '../components/Header';
import Main from './Main';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Main fakeAuth={ fakeAuth } />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
