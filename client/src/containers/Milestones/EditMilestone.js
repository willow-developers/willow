import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { load } from "../../actions/milestone";

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

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditMilestone = reduxForm({
  enableReinitialize: true,
  form: "editMilestone" // a unique identifier for this form
})(EditMilestone);

// You have to connect() to any reducers that you wish to connect to yourself
EditMilestone = connect(
  state => ({
    initialValues: state.milestoneLoader.data // pull initial values from account reducer
  }),
  { load } // bind account loading action creator
)(EditMilestone);

export default EditMilestone;
