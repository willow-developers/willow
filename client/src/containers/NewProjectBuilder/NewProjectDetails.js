import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/NewProjectDetails.module.scss';
import Input from '../../components/UI/Input';
import Dropdown from '../../components/UI/Dropdown';


// TBD:
import { deleteItem } from '../../actions/createProject';

class NewProjectDetails extends Component {
	renderInputs() {
		let { milestoneField } = this.props;
		const options = [
			{ value: 'Action', label: 'Action Item/Task' },
			{ value: 'Objective', label: 'Objective' },
		];

		return _.map(milestoneField, (field, i) => {
			const { valid, pristine, submitting,reset } = this.props;
			return (
				<div key={ field.name }>
					<div className={ styles.row }>
						<div className={ styles.col_7_of_12 }>
							<Field key={ field.name } { ...field } component={ Input }/>
						</div>
						<div className={` ${styles.col_3_of_12} ${styles.align} `}>
							<Field component={ Dropdown } name="label" options={ options } multi />
						</div>
						<div className={` ${styles.col_2_of_12} ${styles.align} `}>
							<Button
								icon={ 'add' }
								value={ 'Add' }
								iconSide={ 'center' }
								type="submit"
								size="small"
								disabledStyle={ !valid || pristine || submitting ? true : false	}
							/>
						</div>
					</div>
				</div>
			);
		});
	}

	handleClick(idx) {
		this.props.deleteItem(idx);
	}

	renderItems() {
    return _.map(this.props.createProjectItems, (item, idx) => (
    	<div className={` ${styles.row} ${styles.item} `} key={ idx }>
				<div className={ styles.col_6_of_12 }>
					{ item.item }
				</div>
				<div className={ styles.col_4_of_12 }>
					{ item.label }
				</div>
				<div className={ styles.col_2_of_12 }>
					<a onClick={ () => this.handleClick(idx) } href="#"><i className= { styles.materialIcons }>delete</i></a>
				</div>
			</div>
    ));
	}

	render() {
		console.log('t.p: ', this.props);
		return (
			<div className={ styles.padder }>
				<h2>Steps required to complete "{this.props.createProjectTitle}": </h2>
				<form onSubmit={ this.props.handleSubmit((values) => {
					this.props.handleAddItem(values);
					this.props.reset();
				})}>
					{ this.renderInputs() }
				</form>
				{ this.props.createProjectItems.length > 0
					? (<div className={` ${styles.row} ${styles.Header} `}>
							<div className={ styles.col_6_of_12 }>Step Name</div>
							<div className={ styles.col_4_of_12 }>Category</div>
							<div className={ styles.col_2_of_12 }></div>
						</div>)
					: null
				}
				{ this.renderItems() }

				<div className={ styles.btnBar }>
					<Button
						handleClick={ () => { this.props.navigateBack('NewProjectTitle'); }}
						icon={ 'navigate_before' }
						value={ 'Back' }
						btnFloat={ 'left' }
						type="submit"
						size="small"
					/>
					<Button 
						handleClick={ () => { this.props.handleAddMilestones(this.props.createProjectItems); }}
						icon={ 'navigate_next' }
						value={ 'Next' }
						btnFloat={ 'right' }
						type="submit"
						size="small"
					/>
				</div>

			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};
	if (!values.item) errors.item = 'Description required in order to add a step';
	if (!values.label) errors.label = 'Please pick a step type';
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
		createProjectTitle: state.createProjectTitle,
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