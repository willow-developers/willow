import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { load } from '../../actions/milestone';

class EditMilestone extends Component {
  componentDidMount() {
    const { load } = this.props;
    load({ text: `${this.props.text}` });
  }

  render() {
    const { pristine, reset, submitting, editMilestone, updateMilestone } = this.props;
    return (
      <div>
        <form
          onSubmit={ this.props.handleSubmit((value) => {
            const update = Object.assign({ id: this.props.id }, value);
            updateMilestone(update);
          })}
        >
          <div>
            <div>
              <Field name="text" component="input" type="text" />
            </div>
          </div>
          <div>
            <button type="submit" disabled={ pristine || submitting }>
              Submit
            </button>
            <button
              type="button"
              disabled={ pristine || submitting }
              onClick={ reset }
            >
              Undo Changes
            </button>
            <button type="button" onClick={ editMilestone }>
              Close
            </button>
          </div>
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
    initialValues: state.milestoneLoader.data
  }),
  { load }
)(EditMilestone);

export default EditMilestone;
