import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loadFormData } from '../../actions/bookmarks';
import _ from 'lodash';

import BookmarkInput from './BookmarkInput';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/BookmarkMetaEdit.module.scss';

class BookmarkMetaEdit extends Component {
	componentDidMount() {
		const { loadFormData, formData } = this.props;
		loadFormData(formData);
	}

	renderInputs() {
		let { formFields } = this.props;
		return _.map(formFields, (field, i) => (
			<Field key={ field.name } { ...field } component={ BookmarkInput } inlineBtn={ 'remove' } />
		));
	}

	render() {
		const { pristine, reset, submitting } = this.props;

		return (
			<div className={ styles.row }>
				<div className={ styles.col_12_of_12 }>
					<h2>Edit Your Bookmark</h2>
					<form onSubmit={ this.props.handleSubmit((values) => this.props.handleBookmarkInfoUpdate(values)) }>
						<div className={ styles.col_12_of_12 }>
							{ this.renderInputs() }
						</div>
						<div className={`${ styles.col_12_of_12 } ${ styles.btnBar }`}>
							<Button
								icon={ 'arrow_back' }
								value={ 'Back' }
								iconSide={ 'left' }
								btnFloat={ 'left' }
								handleClick={ () => this.props.handleBackToPreview() }
							/>
							<Button
								icon={ 'check' }
								value={ 'Save' }
								iconSide={ 'left' }
								btnFloat={ 'right' }
								type="submit"
								disabledStyle={ pristine || submitting ? true : false }
							/>
							<Button
								icon={ 'undo' }
								value={ 'Reset' }
								iconSide={ 'left' }
								btnFloat={ 'right' }
								disabledStyle={ pristine || submitting ? true : false }
								handleClick={ reset }
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

// <Button
// 	icon={ 'check' }
// 	value={ 'Save' }
// 	iconSide={ 'left' }
// 	type="submit"
// 	disabled={ pristine || submitting }
// />
// <Button
// 	icon={ 'undo' }
// 	value={ 'Undo' }
// 	iconSide={ 'left' }
// 	disabled={ pristine || submitting }
// 	handleClick={ reset }
// />

// const tester = (dispatch) => ({ previewBookmarkView: () => dispatch(previewBookmarkView()) });

BookmarkMetaEdit = reduxForm({
	enableReinitialize: true,
	form: 'BookmarkMetaEdit'
})(BookmarkMetaEdit);

BookmarkMetaEdit = connect((state) => ({
		initialValues: state.loadBookmarkScrape.data, // pull initial values from loadBookmarkScrape reducer
		// formFields: state.bookmarkFields,
		// { label: 'Description', name: 'description', type: 'text' },
		formFields: [
			{ label: 'Title', name: 'title', type: 'text' },
			{ label: 'Url', name: 'url', type: 'text' }
		],
		formData: state.bookmarkStatus
	}),
	{ loadFormData }
)(BookmarkMetaEdit);

export default BookmarkMetaEdit;







// import React from "react";

// const BookmarkMetaEdit = () => {
// 	return (
// 		<div>
// 			<h2>Edit Your Bookmark</h2>
// 		</div>
// 	);
// };

// export default BookmarkMetaEdit;
