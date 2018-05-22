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
				Type: <Field component="select" name="label">
					{/* <option></option> */}
					<option value="Action">Action Item/Task</option>
					<option value="Objective">Objective</option>
				</Field>
			</div>
		));
	}

	renderItems() {
    return _.map(this.props.createProjectItems, (item, i) => (
      <li key={i}>Item: { item.item }  --  Category: { item.label }</li>
    ));
	}

	render() {
		return (
			<div>
				<h2>Milestones required to complete this project: </h2>
				<p>Sequentially enter project milestones that must be completed prior to the completion of the project</p>
				<br/>
				<form onSubmit={ this.props.handleSubmit((values) => {
					this.props.handleAddItem(values);
					this.props.reset();
				})}>
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

				{ this.renderItems() }

				<br/> {/* REPLACE WITH STYLING LATER */}

				<Button
					handleClick={ () => { this.props.handleAddMilestones(this.props.createProjectItems); }}
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
		if (values[prop].length > 40) {
			errors[prop] = 'Please limit milestone titles to 40 characters or less.';
		}
	}
	return errors;
};

const mapStateToProps = (state) => {
  return {
		newProjectDetails: state.newProjectDetails,
		createProjectItems: state.createProjectItems,
  };
};

NewProjectDetails = connect(mapStateToProps, null)(NewProjectDetails);

export default reduxForm({
	validate,
	form: 'NewProjectDetails',
	initialValues: { label: 'Action' },
	milestoneField: [
		{ label: 'Action-item or objective that must completed', name: 'item', type: 'text', value: '', placeholder: '' }
	],
})(NewProjectDetails);