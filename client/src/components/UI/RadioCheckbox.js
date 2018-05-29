import React from 'react';
import classNames from 'classnames';
import styles from '../assets/sass/RadioCheckbox.module.scss';

// <Radio
	// styleName={ 'coverUp' 'input_coverUp' }
	// type={ 'radio' 'checkbox' }
	// id={}
	// value={}
	// label={}
// />

const Radio = ({ styleName, data }) => {

	const _setInputStyle = (styles) => (
		classNames(styles.input, {
			[styles.coverUp]: styleName === 'coverUp',
			[styles.input_coverUp]: styleName === 'input_coverUp'
		})
	);

	const renderRadioCheckbox = data.map((input) => {
		return (
			<span key={ input.id } className={ _setInputStyle(styles) }>
		    <input type={ input.type } name={ input.name } id={ input.id } />
		    <label htmlFor={ input.id }>{ input.label }</label>
		  </span>
		);
	}); 

	return (
		<div>
			{ renderRadioCheckbox }
		</div>
	);
}

export default Radio