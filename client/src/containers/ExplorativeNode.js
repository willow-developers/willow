import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bookmarkGetInfo } from '../actions/bookmarks';

// import Loading from '../../components/UI/Loading';
import Notes from './Notes/NotesBody';
import Bookmarks from './Bookmarks/BookmarkBody';

import styles from '../assets/sass/ExplorativeNode.module.scss';

class ExplorativeNode extends Component {
  state = { listHeight: 0 }

  getListHeight = (num) => {
    const listHeight = num;
    this.setState({ listHeight });
  }

	render() {
		return (
      <div className={ styles.row }>
        <div className={` ${styles.col_7_of_12} ${styles.holder} `}>
          <Notes />
        </div>
        <div className={ styles.col_5_of_12 }>
          <Bookmarks getListHeight={ this.getListHeight } shadowHeight={ this.state.listHeight } />
        </div>
      </div>
		);
	}
}

const mapStateToProps = (state) => ({
  // bookmarkHasErrored: state.bookmarkHasErrored,
});

const mapDispatchToProps = (dispatch) => ({
  // previewBookmarkView: () => dispatch(previewBookmarkView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorativeNode);
