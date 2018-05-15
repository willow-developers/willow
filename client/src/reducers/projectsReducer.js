import { PROJECTS_LIST_IS_LOADING, PROJECTS_LIST_HAS_ERRORED, PROJECTS_LIST_SUCCESS } from '../actions/types';

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
		default:
			return state;
	}
}