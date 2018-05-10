import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import validateUrl from '../../utils/validateUrl';
import BookmarkInput from './BookmarkInput';

class BookmarkForm extends Component {
	renderInputs() {
		let { addBookmarkField } = this.props;
		return _.map(addBookmarkField, (field, i) => (
			<Field key={ field.name } { ...field } component={ BookmarkInput } inlineBtn={ 'preview' } />
		));
	}

	render() {
		return (
			<div>
				<h2>Add A Bookmark</h2>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleBookmarkSubmit(values)) }>
					{ this.renderInputs() }
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	if (!values.bookmark) {
		errors.bookmark = 'You forgot to add a url!';
	}
	if (values.bookmark) {
		errors.bookmark = validateUrl(values.bookmark);
	}
  return errors;
};

export default reduxForm({
	validate,
	form: 'bookmarkForm',
	addBookmarkField: [{ label: 'Save Bookmark', name: 'bookmark', type: 'text', value: '', placeholder: '' }]
})(BookmarkForm);