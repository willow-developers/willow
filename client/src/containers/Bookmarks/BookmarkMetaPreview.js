import React, { Component } from "react";
import { connect } from "react-redux";
import { editBookmarkForm } from '../../actions/bookmarks';

import Button from '../../components/UI/Button';
import styles from '../../assets/sass/BookmarkMetaPreview.module.scss';
import bookmark_icon from '../../assets/images/bookmarkIcon.svg';

class BookmarkMetaPreview extends Component {
	render() {
		console.log(this.props)
		const { formData: { url, title } } = this.props;
		return (
			<div className={ styles.row }>
				<div className={ styles.col_12_of_12 }>
					<h2>Review Your Bookmark</h2>
					<div className={`${ styles.row } ${ styles.previewMode }`}>
						<div className={ styles.col_3_of_12 }>
							<div className={ styles.bookmark_icon } id="bkID">
								<img src={ bookmark_icon } alt="Bookmark"/>
							</div>
						</div>
						<div className={ styles.col_9_of_12 }>
							<h3>{ title }</h3>
							<p className={ styles.url }>{ url }</p>
						</div>
						<div className={`${ styles.col_12_of_12 } ${ styles.btnBar }`}>
							<Button
								icon={ 'check' }
								value={ 'Save' }
								iconSide={ 'left' }
								btnFloat={ 'left' }
								handleClick={ () => this.props.handleBookmarkSave(this.props.formData) }
							/>
							<Button
								icon={ 'create' }
								value={ 'Edit' }
								iconSide={ 'right' }
								btnFloat={ 'right' }
								handleClick={ () => this.props.editBookmarkForm() }
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
	formData: state.bookmarkStatus,
	saveBookmark: state.saveBookmark,
});

const mapDispatchToProps = (dispatch) => ({
	editBookmarkForm: () => dispatch(editBookmarkForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkMetaPreview);
