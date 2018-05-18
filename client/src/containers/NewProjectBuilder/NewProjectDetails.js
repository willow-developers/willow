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
		return (
			<div>
				<h2>Milestones required to complete this project: </h2>
				<p>Sequentially enter project milestones that must be completed prior to the completion of the project</p>
				<br/>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleAddMilestones(values)) }>
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
	const errors = {};
	for (var prop in values) {
		if (values[prop].length > 75) {
			errors[prop] = 'Please limit milestone titles to 75 characters or less.';
		}
	}
	return errors;
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