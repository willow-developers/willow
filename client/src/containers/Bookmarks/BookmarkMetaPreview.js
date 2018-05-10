import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { loadFormData } from '../../actions/bookmarks';
import classNames from 'classnames';
import _ from 'lodash';

import BookmarkInput from './BookmarkInput';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/BookmarkMetaPreview.module.scss';
import bookmark_icon from '../../assets/images/bookmarkIcon.svg';

class BookmarkMetaPreview extends Component {
	state = { toggleEdit: true }

	componentDidMount() {
		const { loadFormData, formData } = this.props;
		loadFormData(formData);
	}

	renderInputs() {
		let { formFields } = this.props;
		return _.map(formFields, (field, i) => (
			<Field key={ field.name } { ...field } component={ BookmarkInput } inlineBtn={ 'remove' } />
		));
	}

	render() {
		const { handleSubmit, pristine, reset, submitting, formData: { url, title } } = this.props;
		const { toggleEdit } = this.state;

		return (
			<div className={ styles.row }>
				<div className={ styles.col_12_of_12 }>
					<h2>Review Your Bookmark</h2>
					<form onSubmit={ handleSubmit((values) => console.log(values)) } className={ toggleEdit ? styles.preview : styles.edit }>
						<div className={`${ styles.row } ${ styles.previewMode }`}>
							<div className={ styles.col_3_of_12 }>
								<div className={ styles.bookmark_icon } id="bkID">
									<img src={ bookmark_icon } alt="Bookmark"/>
								</div>
							</div>
							<div className={ styles.col_9_of_12 }>
								<h3>{ title }</h3>
								<p className={ styles.url }>{ url }</p>
							</div>
							<div className={`${ styles.col_12_of_12 } ${ styles.btnBar }`}>
								<Button
									icon={ 'check' }
									value={ 'Save' }
									iconSide={ 'left' }
									btnFloat={ 'left' }
									type="submit"
								/>
								<Button
									icon={ 'create' }
									value={ 'Edit' }
									iconSide={ 'left' }
									btnFloat={ 'right' }
									handleClick={ () => this.setState({ toggleEdit: !this.state.toggleEdit }) }
								/>
							</div>
						</div>
						<div className={`${ styles.row } ${ styles.editMode }`}>
							<div className={ styles.col_12_of_12 }>
								{ this.renderInputs() }
							</div>
							<div className={`${ styles.col_12_of_12 } ${ styles.btnBar }`}>
								im the btn bar for the edit form
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

// <Button
// 	icon={ 'check' }
// 	value={ 'Save' }
// 	iconSide={ 'left' }
// 	type="submit"
// 	disabled={ pristine || submitting }
// />
// <Button
// 	icon={ 'undo' }
// 	value={ 'Undo' }
// 	iconSide={ 'left' }
// 	disabled={ pristine || submitting }
// 	handleClick={ reset }
// />


BookmarkMetaPreview = reduxForm({
	form: 'BookmarkMetaPreview'
})(BookmarkMetaPreview);

BookmarkMetaPreview = connect((state) => ({
		initialValues: state.loadBookmarkScrape.data, // pull initial values from loadBookmarkScrape reducer
		// formFields: state.bookmarkFields,
		// { label: 'Description', name: 'description', type: 'text' },
		formFields: [
			{ label: 'Title', name: 'title', type: 'text' },
			{ label: 'Url', name: 'url', type: 'text' }
		],
		formData: state.bookmarkStatus
	}),
	{ loadFormData }
)(BookmarkMetaPreview);

export default BookmarkMetaPreview;




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";
// import { loadFormData } from '../../actions/bookmarks';
// import _ from 'lodash';

// import BookmarkInput from './BookmarkInput';
// import Button from '../../components/UI/Button';
// import styles from '../../assets/sass/BookmarkMetaPreview.module.scss';
// import bookmark_icon from '../../assets/images/bookmarkIcon.svg';

// class BookmarkMetaPreview extends Component {
// 	state = { toggleEdit: true }

// 	componentDidMount() {
// 		const { loadFormData, formData } = this.props;
// 		loadFormData(formData);
// 	}

// 	renderInputs() {
// 		let { formFields } = this.props;
// 		return _.map(formFields, (field, i) => (
// 			<Field key={ field.name } { ...field } component={ BookmarkInput } inlineBtn={ 'remove' } />
// 		));
// 	}

// 	render() {
// 		const { handleSubmit, pristine, reset, submitting } = this.props;
// 		// console.log(this.state.toggleEdit)
// 		return (
// 			<div>
// 				<h2>Review Your Bookmark</h2>
// 				<form onSubmit={ handleSubmit((values) => console.log(values)) }>
// 					{ this.renderInputs() }
// 					<div className={ styles.btnBar }>
// 						<Button
// 							icon={ 'check' }
// 							value={ 'Save' }
// 							iconSide={ 'left' }
// 							type="submit"
// 							disabled={ pristine || submitting }
// 						/>
// 						<Button
// 							icon={ 'undo' }
// 							value={ 'Undo' }
// 							iconSide={ 'left' }
// 							disabled={ pristine || submitting }
// 							handleClick={ reset }
// 						/>
// 					</div>
// 				</form>
// 			</div>
// 		);
// 	}
// };

// BookmarkMetaPreview = reduxForm({
// 	form: 'BookmarkMetaPreview'
// })(BookmarkMetaPreview);

// BookmarkMetaPreview = connect((state) => ({
// 		initialValues: state.loadBookmarkScrape.data, // pull initial values from loadBookmarkScrape reducer
// 		// formFields: state.bookmarkFields,
// 		formFields: [
// 			{ label: 'Title', name: 'title', type: 'text' },
// 			{ label: 'Description', name: 'description', type: 'text' },
// 			{ label: 'Url', name: 'url', type: 'text' }
// 		],
// 		formData: state.bookmarkStatus
// 	}),
// 	{ loadFormData }
// )(BookmarkMetaPreview);

// export default BookmarkMetaPreview;
