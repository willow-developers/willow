import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import BookmarkInput from './BookmarkInput';

const formFields = [
	{ label: 'Save Bookmark', name: 'bookmark', type: 'text', value: '' }
];

class BookmarkForm extends Component {
	renderInputs() {
		return _.map(formFields, (field, i) => (
			<Field key={ i } { ...field } component={ BookmarkInput } />
		));
		// return _.map(formFields, ({ label, name, type }) => (
		// 	<Field type={ type } name={ name } label={ label } component={ BookmarkInput } />
		// ));
	}
	render() {
		return (
			<div>
				<form onSubmit={ this.props.handleSubmit((value) => console.log(value)) }>
					{ this.renderInputs() }
					<button type="submit">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	if (!values.bookmark) {
		errors.bookmark = 'You must provide a Bookmark URL!';
	}
  return errors;
};

export default reduxForm({
	validate,
	form: 'bookmarkForm'
})(BookmarkForm);