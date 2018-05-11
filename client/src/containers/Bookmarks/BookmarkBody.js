import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bookmarkGetInfo, previewBookmarkView, updateBookmarkInfo, saveBookmarkInfo } from '../../actions/bookmarks';

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

  handleBookmarkSave = (save) => {
    this.props.saveBookmarkInfo(save);
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
      	{ this.props.bookmarkShowAdd
          ? (<BookmarkForm
              handleBookmarkSubmit={ this.handleBookmarkSubmit }
            />)
          : ('')
        }
				{ this.props.bookmarkShowPreview
          ? (<BookmarkMetaPreview
              handleBookmarkSave={ this.handleBookmarkSave }
            />)
          : ('')
        }
				{ this.props.bookmarkShowEdit
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
    bookmarkGetInfo: (bookmarkURL) => dispatch(bookmarkGetInfo(bookmarkURL)),
    previewBookmarkView: () => dispatch(previewBookmarkView()),
    updateBookmarkInfo: (info) => dispatch(updateBookmarkInfo(info)),
    saveBookmarkInfo: (info) => dispatch(saveBookmarkInfo(info))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
