import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userCheckStatus } from '../actions/auth';
import { screenResizeWidth, screenResizeHeight } from '../actions/windowSize';

import Header from '../components/Header';
import Main from './Main';
import Loading from '../components/UI/Loading';

class App extends Component {
  componentDidMount() {
    this.props.userCheckStatus('/api/userData');
    window.addEventListener('resize', this.props.screenResizeWidth);
    window.addEventListener('resize', this.props.screenResizeHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.props.screenResizeWidth);
    window.removeEventListener('resize', this.props.screenResizeHeight);
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
  screenSize: state.uiReducer,
});

const mapDispatchToProps = (dispatch) => ({
  userCheckStatus: (url) => dispatch(userCheckStatus(url)),
  screenResizeWidth: () => dispatch(screenResizeWidth(window.innerWidth)),
  screenResizeHeight: () => dispatch(screenResizeHeight(window.innerHeight)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
