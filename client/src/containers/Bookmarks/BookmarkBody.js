import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarkGetInfo, previewBookmarkView, updateBookmarkInfo, saveBookmark } from '../../actions/bookmarks';

import BookmarkForm from './BookmarkForm';
import BookmarkMetaPreview from './BookmarkMetaPreview';
import Loading from '../../components/UI/Loading';
import BookmarkMetaEdit from './BookmarkMetaEdit';

import styles from '../../assets/sass/BookmarkBody.module.scss';

class BookmarkBody extends Component {
	handleBookmarkSubmit = (url) => {
		this.props.bookmarkGetInfo(url.bookmark);
	}

  handleBackToPreview = () => {
    this.props.previewBookmarkView();
  }

  handleBookmarkInfoUpdate = (info) => {
    this.props.previewBookmarkView();
    this.props.updateBookmarkInfo(info);
  }

  handleBookmarkSave = (data) => {
    // console.log(data)
    this.props.saveBookmark(data);
  }

	renderBookmarkView = () => {
    const { bookmarkHasErrored, bookmarkIsLoading, bookmarkShowAdd, bookmarkShowPreview, bookmarkShowEdit } = this.props;

    if (bookmarkHasErrored) return <p>Sorry! There was an error with your request :(</p>;
    if (bookmarkIsLoading) return <Loading />;
    return (
      <div>
      	{ bookmarkShowAdd
          ? (<BookmarkForm
              handleBookmarkSubmit={ this.handleBookmarkSubmit }
            />)
          : ('')
        }
				{ bookmarkShowPreview
          ? (<BookmarkMetaPreview
              handleBookmarkSave={ this.handleBookmarkSave }
            />)
          : ('')
        }
				{ bookmarkShowEdit
          ? (<BookmarkMetaEdit
              handleBackToPreview={ this.handleBackToPreview }
              handleBookmarkInfoUpdate={ this.handleBookmarkInfoUpdate }
            />)
          : ('')
        }
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

const mapStateToProps = (state) => ({
  bookmarkHasErrored: state.bookmarkHasErrored,
  bookmarkIsLoading: state.bookmarkIsLoading,
  bookmarkStatus: state.bookmarkStatus,
  bookmarkShowAdd: state.bookmarkShowAdd,
  bookmarkShowPreview: state.bookmarkShowPreview,
  bookmarkShowEdit: state.bookmarkShowEdit,
  bookmarkListAdd: state.bookmarkListAdd,
});

const mapDispatchToProps = (dispatch) => ({
  bookmarkGetInfo: (bookmarkURL) => dispatch(bookmarkGetInfo(bookmarkURL)),
  previewBookmarkView: () => dispatch(previewBookmarkView()),
  updateBookmarkInfo: (info) => dispatch(updateBookmarkInfo(info)),
  saveBookmark: (data) => dispatch(saveBookmark(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
