import React, { Component } from 'react';
import styles from '../assets/sass/App.module.scss';

import Header from '../components/Header'

class App extends Component {
  render() {
    return (
      <div className={ styles.app }>
        <Header />
        <p className={ styles.App_intro }>
          Start building something already!
        </p>
      </div>
    );
  }
}

export default App;
