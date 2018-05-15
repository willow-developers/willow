import { PROJECT_HAS_ERRORED, PROJECT_IS_LOADING, PROJECT_SUCCESS, CLEAR_PROJECT_DATA } from '../actions/types';

export function projectHasErrored(state = false, action) {
	switch (action.type) {
		case PROJECT_HAS_ERRORED:
			return action.projectHasErrored;
		default:
			return state;
	}
}

export function projectIsLoading(state = false, action) {
	switch (action.type) {
		case PROJECT_IS_LOADING:
			return action.projectIsLoading;
		default:
			return state;
	}
}

export function projectData(state = {nodes:[], links:[]}, action) {
    switch (action.type) {
		case PROJECT_SUCCESS:
			return action.projectData;
		default:
			return state;
	}
}

export function clearProjectData(state = {nodes:[], links:[]}, action) {
	switch (action.type) {
		case CLEAR_PROJECT_DATA:
			return action.projectData;
		default:
			return state;
	}
}