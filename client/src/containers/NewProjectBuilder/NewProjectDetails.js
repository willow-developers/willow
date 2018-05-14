// CURRENTLY BILLY'S BOOKMARK CODE, NEED TO REFACTOR

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';

import NewProjectInput from './NewProjectInput';

class NewProjectDetails extends Component {
	// OLD WAY:
	// renderInputs() {
	// 	let { newProjectField } = this.props;
	// 	return _.map(newProjectField, (field, i) => (
	// 		<Field key={ field.name } { ...field } component={ NewProjectInput } />
	// 	));
	// }

	// SIMPLE FORM, TWO INPUTS:
	// renderInputs() {
	// 	return (
	// 		<div>
	// 			<Field key={ field.name } { ...field } component={ NewProjectInput } />
	// 			<Field key={ field.name } { ...field } component={ NewProjectInput } />
	// 			<Field key={ field.name } { ...field } component={ NewProjectInput } />
	// 		</div>
	// 	);
	// }

	render() {
		console.log('this.props within newProjectDetails: ', this.props)

		let field = this.props.newProjectField[0];

		return (
			<div>
				<h2>Milestones required to complete this project: </h2>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleProjectNaming(values)) }>
					{/* { this.renderInputs() } */}
					<Field key={ 1 } { ...field } component={ NewProjectInput } />
					<Field key={ 2 } { ...field } component={ NewProjectInput } />
					<Field key={ 3 } { ...field } component={ NewProjectInput } />
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
	form: 'NewProjectDetails',
	newProjectField: [{ label: 'Enter project title here (50 characters or less)', name: 'projectName', type: 'text', value: '', placeholder: '' }]
})(NewProjectDetails);