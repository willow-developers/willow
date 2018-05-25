import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bookmarkGetInfo, previewBookmarkView, updateBookmarkInfo, saveBookmark, deleteBookmark } from '../../actions/bookmarks';

import BookmarkForm from './BookmarkForm';
import BookmarkMetaPreview from './BookmarkMetaPreview';
import Loading from '../../components/UI/Loading';
import BookmarkMetaEdit from './BookmarkMetaEdit';
import BookmarkList from './BookmarkList';

import styles from '../../assets/sass/BookmarkBody.module.scss';

class BookmarkBody extends Component {
  state = { paddingBottom: 0, headerHeight: 0 }

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
    this.props.saveBookmark(data);
  }

  getActionHeight = (num) => {
    const minHeight = num === 0 ? 103 : num;
    this.setState({ paddingBottom: `${minHeight}px` });
  }

  componentDidMount() {
    // console.log(this.refs.listContainer.clientHeight)
    this.props.getListHeight(this.refs.listContainer.clientHeight)
  }

  componentDidUpdate() {
    // console.log(this.refs.listContainer.clientHeight)
    this.props.getListHeight(this.refs.listContainer.clientHeight)
  }

	renderBookmarkView = () => {
    const { bookmarkHasErrored, bookmarkIsLoading, bookmarkShowAdd, bookmarkShowPreview, bookmarkShowEdit } = this.props;

    if (bookmarkHasErrored) return <p>Sorry! There was an error with your request :(</p>;
    if (bookmarkIsLoading) return <div className={ styles.loadHolder }><Loading /></div>;
    return (
      <Fragment>
      	{ bookmarkShowAdd
          ? (<BookmarkForm
              handleBookmarkSubmit={ this.handleBookmarkSubmit }
              getActionHeight={ this.getActionHeight }
            />)
          : ('')
        }
				{ bookmarkShowPreview
          ? (<BookmarkMetaPreview
              handleBookmarkSave={ this.handleBookmarkSave }
              getActionHeight={ this.getActionHeight }
            />)
          : ('')
        }
				{ bookmarkShowEdit
          ? (<BookmarkMetaEdit
              handleBackToPreview={ this.handleBackToPreview }
              handleBookmarkInfoUpdate={ this.handleBookmarkInfoUpdate }
              getActionHeight={ this.getActionHeight }
            />)
          : ('')
        }
      </Fragment>
    );
  }
	render() {
    // console.log(this.state.headerHeight)
		return (
      <Fragment>
        <div className={ styles.listHolder } style={{ paddingBottom: this.state.paddingBottom }} ref="listContainer">
          <BookmarkList deleteBookmark= { this.props.deleteBookmark } />
        </div>
        <div className={ styles.populate }>
          { this.props.shadowHeight > 530 ? <Fragment><hr/><hr/></Fragment> : '' }
          { this.renderBookmarkView() }
        </div>
      </Fragment>
		);
	}
}
// style={{ paddingBottom: this.state.paddingBottom }}

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
  deleteBookmark: (idx) => dispatch(deleteBookmark(idx)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkBody);
