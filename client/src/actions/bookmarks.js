import axios from 'axios';
import { BOOKMARK_HAS_ERRORED, BOOKMARK_IS_LOADING, BOOKMARK_STATUS_SUCCESS } from './types';


export function bookmarkHasErrored(bool) {
	return {
		type: BOOKMARK_HAS_ERRORED,
		hasErrored: bool
	};
}

export function bookmarkIsLoading(bool) {
	return {
		type: BOOKMARK_IS_LOADING,
		isLoading: bool
	};
}

export function bookmarkStatusSuccess(status) {
	return {
		type: BOOKMARK_STATUS_SUCCESS,
		bookmarkStatus: status
	};
}

export function bookmarkGetInfo(targetUrl) {
	return (dispatch) => {
		dispatch(bookmarkIsLoading(true));
		axios.get('/api/bookmarks', { params: { targetUrl } })
			.then((response) => {
				dispatch(bookmarkIsLoading(false));
				return response.data;
			})
			.then((status) => dispatch(bookmarkStatusSuccess(status)))
			.catch(() => dispatch(bookmarkHasErrored(true))
		);
	};
}
