import axios from 'axios';
import { USER_HAS_ERRORED, USER_IS_LOADING, USER_CHECK_STATUS_SUCCESS } from './types';


export function userHasErrored(bool) {
	return {
		type: USER_HAS_ERRORED,
		hasErrored: bool
	};
}

export function userIsLoading(bool) {
	return {
		type: USER_IS_LOADING,
		isLoading: bool
	};
}

export function userCheckStatusSuccess(status) {
	return {
		type: USER_CHECK_STATUS_SUCCESS,
		userStatus: status
	};
}

export function userCheckStatus(url) {
	return (dispatch) => {
		dispatch(userIsLoading(true));
		axios.get(url)
			.then((response) => {
				console.log('response.data[0]: ', response.data[0]);
				dispatch(userIsLoading(false));
				return response.data[0];
		}).then((status) => dispatch(userCheckStatusSuccess(status)))
			.catch(() => dispatch(userHasErrored(true))
		);
	};
}