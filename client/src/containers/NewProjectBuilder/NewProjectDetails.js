// CURRENTLY BILLY'S BOOKMARK CODE, NEED TO REFACTOR

import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import Button from '../../components/UI/Button';

import NewProjectInput from './NewProjectInput';

class NewProjectDetails extends Component {
	renderInputs() {
		let { milestoneField } = this.props;
		console.log('milestone field: ', milestoneField);
		return _.map(milestoneField, (field, i) => (
			<Field key={ field.name } { ...field } component={ NewProjectInput } />
		));
	}

	render() {
		console.log('this.props within newProjectDetails: ', this.props)

		return (
			<div>
				<h2>Milestones required to complete this project: </h2>
				<p>Sequentially enter project milestones that must be completed prior to the completion of the project</p>
				<br/>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleProjectNaming(values)) }>
					{ this.renderInputs() }
					<Button
						icon={ 'navigate_next' }
						value={ 'Next' }
						iconSide={ 'right' }
						type="submit"
					/>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	console.log('values: ', values);
	const errors = {};
	if (!values.milestone1) {
		errors.milestone1 = 'You forgot to add a milestone!';
	}
	if (values.milestone1) {
		errors.milestone1 = maxLength15(values.milestone1);
	}

	if (!values.milestone2) {
		errors.milestone2 = 'You forgot to add a milestone!';
	}
	if (values.milestone2) {
		errors.milestone2 = maxLength15(values.milestone2);
	}

	if (!values.milestone3) {
		errors.milestone3 = 'You forgot to add a milestone!';
	}
	if (values.milestone3) {
		errors.milestone3 = maxLength15(values.milestone3);
	}

  return errors;
};

const maxLength15 = value => {
	if (value.length > 15) {
		return 'Please limit milestone titles to 15 characters or less.';
	}
	return;
};

export default reduxForm({
	validate,
	form: 'NewProjectDetails',
	milestoneField: [
		{ label: 'Enter a major project milestone that must be completed ', name: 'milestone1', type: 'text', value: '', placeholder: '' },
		{ label: 'Enter a major project milestone that must be completed ', name: 'milestone2', type: 'text', value: '', placeholder: '' },
		{ label: 'Enter a major project milestone that must be completed ', name: 'milestone3', type: 'text', value: '', placeholder: '' }
	]
})(NewProjectDetails);