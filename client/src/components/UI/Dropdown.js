import React, { Fragment, Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from '../../assets/sass/Dropdown.module.scss';
// import * as Animated from "react-select/lib/animated";

class Dropdown extends Component {
	render() {
		return (
			<Fragment>
				<Field name="label" component="select">
            <option value="Action">Action Item/Task</option>
            <option value="Objective">Objective</option>
        </Field>
			  <div className={ styles.errorMessage }>{ this.props.meta.touched && this.props.meta.error }</div>
		  </Fragment>
		);
	}
}

export default Dropdown;
