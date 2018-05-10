import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';

import Header from '../components/Header';
import Main from './Main';
import Loading from '../components/UI/Loading';

class App extends Component {
  componentDidMount() {
    this.props.userCheckStatus('/api/current_user');
  }

  renderApp = () => {
    if (this.props.hasErrored) {
      return <p>Sorry! There was an error with your request :(</p>;
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
    userInfo: state.userStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userCheckStatus: (url) => dispatch(userCheckStatus(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
