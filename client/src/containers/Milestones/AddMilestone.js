import React from "react";
import { Field, reduxForm } from "redux-form";

const AddMilestone = (props) => {
  const { pristine, reset, handleSubmit, submitting, createMilestone } = props;

  return (
    <form onSubmit={ handleSubmit(value => {
        createMilestone(value);
        reset();
      })
    }>
      <div>
        <label>Add Milestone</label>
        <div>
          <Field
            name="text"
            component="input"
            type="text"
            placeholder="Add Milestone"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={ pristine || submitting }>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'AddMilestone'
})(AddMilestone);
