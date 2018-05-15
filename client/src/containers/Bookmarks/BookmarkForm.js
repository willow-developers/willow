import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import validateUrl from '../../utils/validateUrl';
import BookmarkInput from './BookmarkInput';
import BookmarkList from './BookmarkList';

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
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleBookmarkSubmit(values)) }>
					{ this.renderInputs() }
				</form>
				<BookmarkList />
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
	addBookmarkField: [{ label: 'Add A Bookmark', name: 'bookmark', type: 'text', value: '', placeholder: '' }]
})(BookmarkForm);