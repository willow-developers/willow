import React, { Component } from 'react';
import styles from '../assets/sass/App.module.scss';

import Header from '../components/Header';

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className={ styles.app }>
        <Header />
      </div>
    );
  }
}

export default App;
