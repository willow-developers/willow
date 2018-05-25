import {
	PROJECTS_LIST_IS_LOADING,
	PROJECTS_LIST_HAS_ERRORED,
	PROJECTS_LIST_SUCCESS,
	DELETE_PROJECT_FROM_STATE,
} from '../actions/types';

export function projectsListHasErrored(state = false, action) {
	switch (action.type) {
		case PROJECTS_LIST_HAS_ERRORED:
			return action.projectsListHasErrored;
		default:
			return state;
	}
}

export function projectsListIsLoading(state = false, action) {
	switch (action.type) {
		case PROJECTS_LIST_IS_LOADING:
			return action.projectsListIsLoading;
		default:
			return state;
	}
}

export function projectsList(state = [], action) {
    switch (action.type) {
		case PROJECTS_LIST_SUCCESS:
			return action.projectsList;
		case DELETE_PROJECT_FROM_STATE:
			return [ ...state.slice(0, action.payload) , ...state.slice(action.payload + 1) ];
		default:
			return state;
	}
}