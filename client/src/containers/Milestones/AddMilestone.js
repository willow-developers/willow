import React from 'react';
import { Field, reduxForm } from 'redux-form';
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

export default reduxForm({
  form: 'AddMilestone',
  addMilestoneField: [{ label: 'Add Milestone', name: 'text', type: 'text', value: '', placeholder: '' }]
})(AddMilestone);
