import { combineReducers } from 'redux';
import  { reducer as reduxForm } from 'redux-form';
import { userStatus, userHasErrored, userIsLoading } from './authReducer';
import { isModalOpen } from './modalReducer';
import { bookmarkStatus, bookmarkHasErrored, bookmarkIsLoading } from './bookmarkReducer';

export default combineReducers({
	userStatus,
	userHasErrored,
	userIsLoading,
	isModalOpen,
	bookmarkStatus,
	bookmarkHasErrored,
	bookmarkIsLoading,
	form: reduxForm
});