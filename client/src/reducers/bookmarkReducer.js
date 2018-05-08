import { BOOKMARK_HAS_ERRORED, BOOKMARK_IS_LOADING, BOOKMARK_STATUS_SUCCESS } from '../actions/types';

export function bookmarkHasErrored(state = false, action) {
	switch (action.type) {
		case BOOKMARK_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}

export function bookmarkIsLoading(state = false, action) {
	switch (action.type) {
		case BOOKMARK_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}

export function bookmarkStatus(state = null, action) {
	switch (action.type) {
		case BOOKMARK_STATUS_SUCCESS:
			return action.bookmarkStatus || false;
		default:
			return state;
	}
}