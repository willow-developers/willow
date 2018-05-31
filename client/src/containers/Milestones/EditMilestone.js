import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load } from '../../actions/milestone';
import _ from 'lodash';

import Input from '../../components/UI/Input';

class EditMilestone extends Component {
  componentDidMount() {
    const { load } = this.props;
    load({ text: `${this.props.text}` });
  }

  render() {
    const { editMilestone, updateMilestone, editMilestoneInput } = this.props;
    
    const renderInputs = () => {
      return _.map(editMilestoneInput, (field, i) => (
        <Field
          key={ field.name }
          { ...field }
          component={ Input }
          inlineBtn={ 'editMilestone' }
          editMilestone={ editMilestone }
        />
      ));
    };

    return (
      <div>
        <form onSubmit={ this.props.handleSubmit((value) => {
            const update = Object.assign({ id: this.props.id }, value);
            updateMilestone(update);
          })}
        >
          { renderInputs() }
        </form>
      </div>
    );
  }
}

EditMilestone = reduxForm({
  enableReinitialize: true,
  form: 'editMilestone'
})(EditMilestone);

EditMilestone = connect(
  state => ({
    initialValues: state.milestoneLoader.data,
    editMilestoneInput: [{ label: '', name: 'text', type: 'text', value: '', placeholder: '' }]
  }),
  { load }
)(EditMilestone);

export default EditMilestone;
