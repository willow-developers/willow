import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load } from '../../actions/milestone';
import _ from 'lodash';
// import styles from '../../assets/sass/AddMilestone.module.scss';

import Input from '../../components/UI/Input';

class NodeTitleEdit extends Component {
  componentDidMount() {
    const { load } = this.props;
    load({ text: `${this.props.title}` });
  }

  render() {
    const { editMilestoneInput, updateNodeTitle, showDisplayTitle } = this.props;
    const renderInputs = () => {
      return _.map(editMilestoneInput, (field, i) => (
        <Field
          key={ field.name }
          { ...field }
          component={ Input }
          inlineBtn={ 'editTitle' }
          showDisplayTitle={ showDisplayTitle }
        />
      ));
    }

    return (
      <div>
        <form onSubmit={ this.props.handleSubmit((value) => {
            updateNodeTitle(value.text);
            showDisplayTitle();
          })}
        >
          { renderInputs() }
        </form>
      </div>
    );
  }
}

NodeTitleEdit = reduxForm({
  enableReinitialize: true,
  form: 'NodeTitleEdit'
})(NodeTitleEdit);

NodeTitleEdit = connect(
  state => ({
    initialValues: state.milestoneLoader.data,
    editMilestoneInput: [{ label: '', name: 'text', type: 'text', value: '', placeholder: '' }]
  }),
  { load }
)(NodeTitleEdit);

export default NodeTitleEdit;
