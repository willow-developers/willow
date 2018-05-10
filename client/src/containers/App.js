import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';

// used for Google OAuth -- delete later if not being used
import axios from 'axios';

import Header from '../components/Header';
import Main from './Main';
import Loading from '../components/UI/Loading';

class App extends Component {
  componentDidMount() {

    // make axios call in order to access session data:
    // axios('/api/userData')
    //   .then(resp => {

    //     // if the user is logged in:
    //     if (resp.data) {
          
    //     }

    // }).catch(err => {
    //     console.log(err);
    // });

    this.props.userCheckStatus('/api/userData');
  }

  renderApp = () => {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.isLoading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }

  render() {
    return (
      <BrowserRouter>
        { this.renderApp() }
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasErrored: state.userHasErrored,
    isLoading: state.userIsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userCheckStatus: (url) => {
      console.log('firing user check status in App.js to: ', url);
      dispatch(userCheckStatus(url))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
