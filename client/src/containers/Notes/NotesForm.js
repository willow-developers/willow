import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load } from '../../actions/milestone';
import _ from 'lodash';
import styles from '../../assets/sass/AddNote.module.scss';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

class AddNote extends Component {
  componentDidMount() {
    const { load, noteEdit } = this.props;
    load(noteEdit);
  }

  render() {
    const { addNoteInputs, pristine, submitting, reset, closeNoteView, addNote, updateNote, noteEdit } = this.props;
    const isUpdating = noteEdit.title.length > 0 || noteEdit.content.length > 0;

    const renderInputs = () => {
      return _.map(addNoteInputs, (field) => (
        <Field key={ field.name } { ...field } component={ Input } />
      ));
    }
    return (
      <div>
        <form onSubmit={ this.props.handleSubmit((value) => {
          if (isUpdating) {
            updateNote(value)
          } else {
            addNote(value);
          }
          reset();
          closeNoteView();
        })}>
          { renderInputs() }
          <div className={ styles.btnBox }>
            <Button
              value={ isUpdating ? 'Update' : 'Save' }
              iconSide={ 'right' }
              icon={ 'check' }
              disabledStyle={ pristine || submitting ? true : false }
              type="submit"
            />
            { isUpdating
              ? (<Button
                  value={ 'Undo' }
                  icon={ 'undo' }
                  iconSide={ 'center' }
                  handleClick={ reset }
                  disabledStyle={ pristine || submitting ? true : false }
                />)
              : ('')
            }
            <Button
              icon={ 'cancel' }
              value={ 'Cancel' }
              iconSide={ 'center' }
              btnFloat={ 'none' }
              handleClick={ () => closeNoteView() }
            />
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'You forgot to add a title!';
  }
  if (!values.content) {
    errors.content = 'You forgot to add your notes!';
  }
  return errors;
};

AddNote = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'addNote',
})(AddNote);

AddNote = connect(
  state => ({
    initialValues: state.milestoneLoader.data,
    addNoteInputs: [{ label: 'Title', name: 'title', type: 'text' }, { label: 'Content', name: 'content', type: 'textarea' }],
  }),
  { load }
)(AddNote);

export default AddNote;
