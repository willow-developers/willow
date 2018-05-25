import { PROJECT_HAS_ERRORED, PROJECT_IS_LOADING, PROJECT_SUCCESS, CLEAR_PROJECT_DATA, PROJECT_TITLE, RESET_TITLE, EDIT_TITLE, EDIT_FORM_TITLE, } from '../actions/types';

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

export function setNodeTitle(state = "", action) {
	switch (action.type) {
		case PROJECT_TITLE:
			return action.projectTitle;
		case RESET_TITLE:
      return "";
		default:
			return state;
	}
}

export function showTitle(state = true, action) {
	switch (action.type) {
		case EDIT_TITLE:
			return action.showTitle;
		default:
			return state;
	}
}

export function showTitleForm(state = false, action) {
	switch (action.type) {
		case EDIT_FORM_TITLE:
			return action.showFormTitle;
		default:
			return state;
	}
}