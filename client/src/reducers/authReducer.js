import { USER_HAS_ERRORED, USER_IS_LOADING, USER_CHECK_STATUS_SUCCESS } from '../actions/types';

export function userHasErrored(state = false, action) {
	switch (action.type) {
		case USER_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}

export function userIsLoading(state = false, action) {
	switch (action.type) {
		case USER_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}

export function userStatus(state = null, action) {
	switch (action.type) {
		case USER_CHECK_STATUS_SUCCESS:
			return action.userStatus || false;
		default:
			return state;
	}
}