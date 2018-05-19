import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { screenResize } from '../actions/windowSize';

import Header from '../components/Header';
import Main from './Main';
import Loading from '../components/UI/Loading';

class App extends Component {
  componentDidMount() {
    this.props.userCheckStatus('/api/userData');
    window.addEventListener('resize', this.props.screenResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.screenResize);
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

const mapStateToProps = (state) => ({
  hasErrored: state.userHasErrored,
  isLoading: state.userIsLoading,
  userInfo: state.userStatus,
  screenWidth: state.uiReducer,
});

const mapDispatchToProps = (dispatch) => ({
  userCheckStatus: (url) => dispatch(userCheckStatus(url)),
  screenResize: () => dispatch(screenResize(window.innerWidth)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
