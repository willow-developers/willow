import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from '../../assets/sass/AddMilestone.module.scss';
import Input from '../../components/UI/Input';

const AddMilestone = (props) => {
  const { reset, handleSubmit, createMilestone, addMilestoneField } = props;
  const renderInputs = () => {
    return _.map(addMilestoneField, (field, i) => (
      <Field key={ field.name } { ...field } component={ Input } inlineBtn={ 'addMilestone' } />
    ));
  }

  return (
    <div className={ styles.addInput }>
      <form onSubmit={ handleSubmit((value) => {
          createMilestone(value);
          reset();
        })
      }>
        { renderInputs() }
      </form>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  form: ownProps.column
});

export default compose(
  connect(mapStateToProps),
  reduxForm({
    addMilestoneField: [{ label: 'Add Milestone', name: 'text', type: 'text', value: '', placeholder: '' }]
  })
)(AddMilestone);