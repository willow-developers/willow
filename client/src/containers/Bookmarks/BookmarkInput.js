import React, { Component } from 'react';
import styles from '../../assets/sass/Input.module.scss';

class BookmarkInput extends Component {
	state = {
		isActive: false
	}

	render() {
		return (
			<div className={ styles.input_field }>
				<input { ...this.props } />
				<label htmlFor={ this.props.name }>
					{ this.props.label }
				</label>
				<span>{ this.props.meta.error }</span>
			</div>
		);
	}
}

export default BookmarkInput;
