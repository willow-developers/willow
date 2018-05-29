import React, { Fragment, Component } from 'react';
import * as Animated from "react-select/lib/animated";
import Select from 'react-select';

import styles from '../../assets/sass/Dropdown.module.scss';

class Dropdown extends Component {
	onChange(event) {
    // console.log(event)
    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value);
    } else {
      // Clear the input field
      this.props.input.onChange(null);
    }
  }

	render() {
		return (
			<Fragment>
			  <Select
			  	{ ...this.props.input }
			  	classNamePrefix={ styles.Dropdown }
			  	options={ this.props.options }
			  	components={ Animated }
			  	value={ this.props.input.value || '' }
			  	onBlur={ () => this.props.input.onBlur(this.props.input.value) }
        	onChange={ this.onChange.bind(this) }
        	closeMenuOnSelect={ true }
			  	hasValue={ false }
			  />
			  <div className={ styles.errorMessage }>{ this.props.meta.touched && this.props.meta.error }</div>
		  </Fragment>
		);
	}
}

export default Dropdown;

// https://ashiknesin.com/blog/use-react-select-within-redux-form/