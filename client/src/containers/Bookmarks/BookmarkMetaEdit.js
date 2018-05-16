import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loadFormData } from '../../actions/bookmarks';
import _ from 'lodash';

import validateUrl from '../../utils/validateUrl';
import Input from '../../components/UI/Input';
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
			<Field key={ field.name } { ...field } component={ Input } inlineBtn={ 'remove' } />
		));
	}

	render() {
		const { pristine, reset, submitting, valid } = this.props;

		return (
			<div className={ styles.row }>
				<div className={ styles.col_12_of_12 }>
					<h2>Edit Your Bookmark</h2>
					<form onSubmit={ this.props.handleSubmit((values) => this.props.handleBookmarkInfoUpdate(values)) } className={ styles.editForm }>
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
								disabledStyle={ !valid || pristine || submitting ? true : false  }
							/>
							<Button
								icon={ 'undo' }
								value={ 'Reset' }
								iconSide={ 'left' }
								btnFloat={ 'right' }
								disabledStyle={ !valid || pristine || submitting ? true : false }
								handleClick={ reset }
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

const validate = (values) => {
	const errors = {};
	if (!values.url) {
		errors.url = 'You forgot to add a url!';
	}
	if (values.url) {
		errors.url = validateUrl(values.url);
	}
  return errors;
};

BookmarkMetaEdit = reduxForm({
	validate,
	enableReinitialize: true,
	form: 'BookmarkMetaEdit'
})(BookmarkMetaEdit);

BookmarkMetaEdit = connect((state) => ({
		initialValues: state.loadBookmarkScrape.data,
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
