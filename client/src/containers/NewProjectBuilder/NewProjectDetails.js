import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/AddMilestone.module.scss';
import NewProjectInput from './NewProjectInput';
import Input from '../../components/UI/Input';

class NewProjectDetails extends Component {
	renderInputs() {
		let { milestoneField } = this.props;

		return _.map(milestoneField, (field, i) => (
			<div key={ field.name }>
				<Field key={ field.name } { ...field } component={ Input }/>
				Type: <Field component="select">
					<option></option>
					<option value="LABEL_GOES_HERE">Action Item/Task</option>
					<option value="LABEL_GOES_HERE_2">Objective</option>
				</Field>
			</div>
		));
	}

	render() {
		return (
			<div>
				<h2>Milestones required to complete this project: </h2>
				<p>Sequentially enter project milestones that must be completed prior to the completion of the project</p>
				<br/>
				<form onSubmit={ this.props.handleSubmit((values) => this.props.handleAddItem(values)) }>
					{ this.renderInputs() }
					<br/> {/* REPLACE WITH STYLING LATER */}
					<Button
						icon={ 'add' }
						value={ 'Add Item' }
						iconSide={ 'center' }
						type="submit"
						size="small"
					/>
				</form>
				<br/> {/* REPLACE WITH STYLING LATER */}

				{/* ITEMS GO HERE ONCE RETURNED FROM STATE */}

				<Button
					handleClick={ () => { this.props.handleAddMilestones(this.state.______); }}
					icon={ 'navigate_next' }
					value={ 'Next' }
					/* btnFloat={ 'right' } */ // COME BACK TO THIS
					type="submit"
					size="small"
				/>
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

const mapStateToProps = (state) => {
  return {
    newProjectDetails: state.newProjectDetails,
  };
};

NewProjectDetails = connect(mapStateToProps, null)(NewProjectDetails);

export default reduxForm({
	validate,
	form: 'NewProjectDetails',
	milestoneField: [
		{ label: 'Action-item or objective that must completed', name: 'milestone1', type: 'text', value: '', placeholder: '' }
	],
})(NewProjectDetails);