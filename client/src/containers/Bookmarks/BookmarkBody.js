import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarkGetInfo } from '../../actions/bookmarks';

import BookmarkForm from './BookmarkForm';
import BookmarkMetaPreview from './BookmarkMetaPreview';
import Loading from '../../components/UI/Loading';
import BookmarkMetaEdit from './BookmarkMetaEdit';

import styles from '../../assets/sass/BookmarkBody.module.scss';

class BookmarkBody extends Component {
	handleBookmarkSubmit = (url) => {
		this.props.bookmarkGetInfo(url.bookmark);
	}

	renderBookmarkView = () => {
    if (this.props.bookmarkHasErrored) {
      return <p>Sorry! There was an error with your request :(</p>;
    }
    if (this.props.bookmarkIsLoading) {
      return <Loading />;
    }
    return (
      <div>
      	{ this.props.bookmarkShowAdd ? <BookmarkForm handleBookmarkSubmit={ this.handleBookmarkSubmit } /> : '' }
				{ this.props.bookmarkShowPreview ? <BookmarkMetaPreview /> : '' }
				{ this.props.bookmarkShowEdit ? <BookmarkMetaEdit /> : '' }
      </div>
    );
  }

	render() {
		return (
      <div className={ styles.forLoader }>
        { this.renderBookmarkView() }
      </div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    bookmarkHasErrored: state.bookmarkHasErrored,
    bookmarkIsLoading: state.bookmarkIsLoading,
    bookmarkStatus: state.bookmarkStatus,
    bookmarkShowAdd: state.bookmarkShowAdd,
    bookmarkShowPreview: state.bookmarkShowPreview,
    bookmarkShowEdit: state.bookmarkShowEdit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    bookmarkGetInfo: (bookmarkURL) => dispatch(bookmarkGetInfo(bookmarkURL))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
