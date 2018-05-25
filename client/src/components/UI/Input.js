import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import styles from '../../assets/sass/Input.module.scss';
import Button from './Button';

const DEFAULT_HEIGHT = 36;

class BookmarkInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			height: DEFAULT_HEIGHT
		}

		this.setFilledTextareaHeight = this.setFilledTextareaHeight.bind(this);
	}

	componentDidMount() {
		this.setFilledTextareaHeight();
		this.setFilledTextareaHeight();
	}

	setFilledTextareaHeight() {
		const element = this.ghost;

		if (element) {
			let extra = element.clientHeight + 12;
			this.setState({ height: extra });
		}
	}

	render() {
		const { input, label, type, placeholder, meta: { error, touched, valid, pristine, submitting, reset }, editMilestone, showDisplayTitle } = this.props;
		const { isActive } = this.state;

		const _setDisplayClass = () => (
			classNames(styles.input_field, {
				[styles.inlinePreviewBtn]: this.props.inlineBtn === 'preview',
				[styles.inlineAddMilestoneBtn]: this.props.inlineBtn === 'addMilestone',
				[styles.inlineEditMilestoneBtn]: this.props.inlineBtn === 'editMilestone',
				[styles.inlineEditMilestoneBtn]: this.props.inlineBtn === 'editTitle',
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
						disabledStyle={ !valid || pristine || submitting ? true : false	}
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
						disabledStyle={ !valid || pristine || submitting ? true : false	}
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
							disabledStyle={ pristine || submitting ? true : false	}
						/>
						<Button
							icon={ 'undo' }
							iconSide={ 'center' }
							handleClick={ reset }
							styleClass={ 'skinnyIcon' }
							disabledStyle={ pristine || submitting ? true : false	}
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
			if (this.props.inlineBtn === 'editTitle') {
				return (
					<div className={ styles.btnBox }>
						<Button
							value={ 'Update' }
							iconSide={ 'right' }
							type="submit"
							styleClass={ 'noShadow' }
							disabledStyle={ pristine || submitting ? true : false	}
						/>
						<Button
							icon={ 'undo' }
							iconSide={ 'center' }
							handleClick={ reset }
							styleClass={ 'skinnyIcon' }
							disabledStyle={ pristine || submitting ? true : false	}
						/>
						<Button
							icon={ 'cancel' }
							iconSide={ 'center' }
							btnFloat={ 'none' }
							styleClass={ 'skinnyIcon' }
							handleClick={ () => showDisplayTitle() }
						/>
					</div>
				);
			}
			return;
		}
		
		const getExpandableField = () => {
			const isOneLine = this.state.height <= DEFAULT_HEIGHT;
    	const { height } = this.state;

			return (
				<textarea
					{ ...input }
					id={ input.name }
					type={ type }
					onFocus={ () => input.onFocus(this.setState({ isActive: true })) }
					onBlur={ () => input.onBlur(this.setState({ isActive: false })) }
					placeholder={ placeholder }
					style={{ height, resize: isOneLine ? "none" : null }}
					onKeyUp={ this.setFilledTextareaHeight }
				></textarea>
			);
		}

		const getGhostField = (text) => {
	    return (
	      <div className={ styles.ghost } ref={ (c) => this.ghost = c } aria-hidden="true">
	        { text }
	      </div>
	    );
	  }


		const renderInput = () => {
			if (type === 'textarea') {
				return (
					<Fragment>
						{ getGhostField(input.value) }
						{ getExpandableField() }
					</Fragment>
				);
			}
			return (
				<input
					{ ...input }
					id={ input.name }
					type={ type }
					onFocus={ () => input.onFocus(this.setState({ isActive: true })) }
					onBlur={ () => input.onBlur(this.setState({ isActive: false })) }
					placeholder={ placeholder }
					value={ input.value }
				/>
			);
		}

		return (
			<div className={ _setDisplayClass() }>
				{ renderInput() }
				<label htmlFor={ input.name } className={ _setActiveClass() }>{ label }</label>
				<div className={ styles.errorMessage }>{ touched && error }</div>
				{ showInlineBtn() }
			</div>
		);
	}
}

export default BookmarkInput;
