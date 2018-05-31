import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../assets/sass/Input.module.scss';
import Button from '../../components/UI/Button';

class NewProjectInput extends Component {
	state = { isActive: false };

	// render button only if this NewProjectInput is being inserted into the NewProjectTitle.js file
	conditionallyRenderButton = () => {
		if (this.props.input.name === 'projectName') {
			return (
				<Button
					icon={ 'navigate_next' }
					value={ 'Next' }
					iconSide={ 'right' }
					type="submit"
				/>
			);
		} else {
			return (
				<div></div>
			);
		}
	}

	render() {
		const { input, label, type, placeholder, meta: { error, touched }} = this.props;
		const { isActive } = this.state;

		const _setDisplayClass = () => (
			classNames(styles.input_field, {
				[styles.inlinePreviewBtn]: this.props.inlineBtn === 'preview',
			})
		);

		const _setActiveClass = () => (
			classNames({ [styles.active]: isActive === true || input.value.length > 0 || !!placeholder })
		);

		return (
			<div>
				<div className={ _setDisplayClass() }>
					<input
						{ ...input }
						id={ input.name }
						type={ type }
						onFocus={ () => input.onFocus(this.setState({ isActive: true })) }
						onBlur={ () => input.onBlur(this.setState({ isActive: false })) }
						placeholder={ placeholder }
						value={ input.value }
					/>
					<label htmlFor={ input.name } className={ _setActiveClass() }>{ label }</label>
					<div className={ styles.errorMessage }>{ touched && error }</div>
				</div>
				{ this.conditionallyRenderButton() }
			</div>
		);
	}
}

export default NewProjectInput;
