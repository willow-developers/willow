import { combineReducers } from 'redux';
import { userStatus, userHasErrored, userIsLoading } from './authReducer';

export default combineReducers({
	userStatus,
	userHasErrored,
	userIsLoading
});