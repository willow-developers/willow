import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load } from '../../actions/milestone';
import _ from 'lodash';
// import styles from '../../assets/sass/AddMilestone.module.scss';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

class AddNote extends Component {
  // componentDidMount() {
  //   const { load } = this.props;
  //   load({
  //     title: `${this.props.title}`,
  //     content: `${this.props.content}`,
  //   });
  // }

  render() {
    const { addNoteInputs, pristine, submitting, reset, closeNoteView } = this.props;
    const renderInputs = () => {
      return _.map(addNoteInputs, (field, i) => (
        <Field key={ field.name } { ...field } component={ Input } />
      ));
    }

    return (
      <div>
        <form onSubmit={ this.props.handleSubmit((value) => console.log(value)) } >
          { renderInputs() }
          <div className="btnBox">
            <Button
              value={ 'Update' }
              iconSide={ 'right' }
              disabledStyle={ pristine || submitting ? true : false }
              type="submit"
            />
            <Button
              icon={ 'undo' }
              iconSide={ 'center' }
              handleClick={ reset }
              disabledStyle={ pristine || submitting ? true : false }
            />
            <Button
              icon={ 'cancel' }
              iconSide={ 'center' }
              btnFloat={ 'none' }
            />
          </div>
        </form>
      </div>
    );
  }
}

// styleClass={ 'noShadow' }

AddNote = reduxForm({
  enableReinitialize: true,
  form: 'addNote'
})(AddNote);

AddNote = connect(
  state => ({
    initialValues: state.milestoneLoader.data,
    addNoteInputs: [{ label: 'Title', name: 'title', type: 'text' }, { label: 'Content', name: 'content', type: 'textarea' }]
  }),
  { load }
)(AddNote);

export default AddNote;
