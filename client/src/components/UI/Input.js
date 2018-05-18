import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../assets/sass/Input.module.scss';
import Button from './Button';


class BookmarkInput extends Component {
	state = { isActive: false }

	render() {
		const { input, label, type, placeholder, meta: { error, touched, valid, pristine, submitting, reset }, editMilestone } = this.props;
		const { isActive } = this.state;

		const _setDisplayClass = () => (
			classNames(styles.input_field, {
				[styles.inlinePreviewBtn]: this.props.inlineBtn === 'preview',
				[styles.inlineAddMilestoneBtn]: this.props.inlineBtn === 'addMilestone',
				[styles.inlineEditMilestoneBtn]: this.props.inlineBtn === 'editMilestone',
			})
		);

		const _setActiveClass = () => (
			classNames({ [styles.active]: isActive === true || input.value.length > 0 || !!placeholder })
		);

		const showInlineBtn = () => {
			if (this.props.inlineBtn === 'preview') {
				return (
					<Button
						icon={ 'rate_review' }
						value={ 'Preview' }
						iconSide={ 'right' }
						type="submit"
						styleClass={ 'noShadow' }
						disabledStyle={ !valid || pristine || submitting ? true : false  }
					/>
				);
			}
			if (this.props.inlineBtn === 'addMilestone') {
				return (
					<Button
						icon={ 'add' }
						value={ 'Add' }
						iconSide={ 'right' }
						type="submit"
						styleClass={ 'noShadow' }
						disabledStyle={ !valid || pristine || submitting ? true : false  }
					/>
				);
			}
			if (this.props.inlineBtn === 'editMilestone') {
				return (
					<div className={ styles.btnBox }>
						<Button
							value={ 'Update' }
							iconSide={ 'right' }
							type="submit"
							styleClass={ 'noShadow' }
							disabledStyle={ pristine || submitting ? true : false  }
						/>
						<Button
							icon={ 'undo' }
							iconSide={ 'center' }
							handleClick={ reset }
							styleClass={ 'skinnyIcon' }
							disabledStyle={ pristine || submitting ? true : false  }
						/>
						<Button
							icon={ 'cancel' }
							iconSide={ 'center' }
							btnFloat={ 'none' }
							styleClass={ 'skinnyIcon' }
							handleClick={ editMilestone }
						/>
					</div>
				);
			}
			return;
		}

		return (
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
				{ showInlineBtn() }
			</div>
		);
	}
}

export default BookmarkInput;
