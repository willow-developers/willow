import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/AddMilestone.module.scss';
import Input from '../../components/UI/Input';

// TBD:
import { deleteItem } from '../../actions/createProject';

class NewProjectDetails extends Component {
	renderInputs() {
		let { milestoneField } = this.props;

		return _.map(milestoneField, (field, i) => (
			<div key={ field.name }>
				<Field key={ field.name } { ...field } component={ Input }/>
				Type: <Field component="select" name="label">
					<option value="Action">Action Item/Task</option>
					<option value="Objective">Objective</option>
				</Field>
			</div>
		));
	}

	handleClick(idx) {
		this.props.deleteItem(idx);
	}

	renderItems() {
    return _.map(this.props.createProjectItems, (item, idx) => (
      <li key={ idx }>
				Item: { item.item }  --  Category: { item.label } -- {/*update styling later*/}
				<i><a onClick={ () => this.handleClick(idx) } href="#">Delete</a></i> {/*update styling later*/}
			</li>
    ));
	}

	render() {
		return (
			<div>
				<h2>Steps required to complete this project: </h2>
				{/* <p>Sequentially enter project actions or objectives that must be completed prior to the completion of the project</p> */}
				
				{/* <br/> */}{/* REPLACE WITH STYLING LATER */}

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
					/* btnFloat={ 'right' } */ // COME BACK TO STYLE AND PLACE THE BUTTON
					type="submit"
					size="small"
				/>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	if (!values.item) errors.item = 'Description required in order to add a step';
	if (values.item) errors.item = validateLength40(values.item);
  return errors;
};

const validateLength40 = item => {
	if (item.length > 40) return 'Please limit your project title to 40 characters or less.';
	return;
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