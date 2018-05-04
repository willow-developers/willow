import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../assets/sass/Input.module.scss';


class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			value: ''
		}
		this.setValue = this.setValue.bind(this);
		this.isActive = this.isActive.bind(this);
		this.hasLabel = this.hasLabel.bind(this);
	}

	setValue(val, id) {
		this.setState({ value: val });
		this.props.getValue(val, id);
	}

	isActive() {
		const { active, value } = this.state;
		if (active === true || value.length > 0 || !!this.props.placeHolder) {
			return styles.active;
		}
		return;
	}

	hasLabel() {
		if (this.props.label) {
			return (
				<label htmlFor={ this.props.id } className={ this.isActive() }>
					{ this.props.label }
				</label>
			);
		}
		return;
	}

	componentDidMount() {
		if (this.props.value) {
			this.setState({ value: this.props.value });
		}
	}

	render() {
		const _getClassNames = (styles) => (
			classNames(styles.input_field, {
				[styles.removeBtns]: this.props.remove
			})
		);

		return (
			<div className={ _getClassNames(styles) }>
				<input
					type="text"
					id={ this.props.id }
					value={ this.state.value }
					onFocus={ () => this.setState({ active: true }) }
					onBlur={ () => this.setState({ active: false }) }
					onChange={ (evt) => this.setValue(evt.target.value, this.props.id) }
					placeholder={ this.props.placeHolder }
				/>
				{ this.hasLabel() }
			</div>
		);
	}
}

export default Input;
