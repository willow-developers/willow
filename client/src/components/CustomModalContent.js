import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarkGetInfo } from '../actions/bookmarks';

class CustomModalContent extends Component {
  render() {
    return (
      <div className="poop">
      	<h4>Custom Modal Content</h4>
      	<button onClick={ () => this.props.bookmarkGetInfo('https://materializecss.com/color.html') }>testing</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bookmarkHasErrored: state.bookmarkHasErrored,
    bookmarkIsLoading: state.bookmarkIsLoading,
    bookmarkStatus: state.bookmarkStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookmarkGetInfo: (bookmarkURL) => dispatch(bookmarkGetInfo(bookmarkURL))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomModalContent);
