// CURRENTLY BILLY'S BOOKMARK CODE, NEED TO REFACTOR

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import NewProjectInput from './NewProjectInput';

class NewProjectTitle extends Component {
	renderInputs() {
		let { newProjectField } = this.props;
		return _.map(newProjectField, (field, i) => (
			<Field key={ field.name } { ...field } component={ NewProjectInput } />
		));
	}

	render() {
		return (
			<div>
				<h2>Project Name: </h2>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleProjectNaming(values)) }>
					{ this.renderInputs() }
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	if (!values.projectTitle) {
		errors.projectTitle = 'You forgot to add a project title!';
	}
	if (values.projectTitle) {
		errors.projectTitle = validateProjectTitle(values.projectTitle);
	}
  return errors;
};

const validateProjectTitle = title => {
	if (title.length > 50) {
		return 'Please limit your project title to 50 characters or less.';
	}
	return;
};

export default reduxForm({
	validate,
	form: 'NewProjectTitle',
	newProjectField: [{ label: 'Enter project title here (50 characters or less)', name: 'projectName', type: 'text', value: '', placeholder: '' }]
})(NewProjectTitle);