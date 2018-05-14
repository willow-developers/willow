import { 
  CREATE_PROJECT_SHOW_ADD_DETAILS,
  CREATE_PROJECT_SHOW_NEW_PROJECT_FORM,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING
} from '../actions/types';

export function createProjectModalToShow(state = 'NewProjectForm', action) {
	switch (action.type) {
		case CREATE_PROJECT_SHOW_ADD_DETAILS:
      return action.payload;
    case CREATE_PROJECT_SHOW_NEW_PROJECT_FORM:
      return action.payload;
		default:
			return state;
	}
}

export function createProjectHasErrored(state = false, action) {
	switch (action.type) {
		case CREATE_PROJECT_HAS_ERRORED:
			return action.payload;
		default:
			return state;
	}
}

export function createProjectDataIsLoading(state = false, action) {
	switch (action.type) {
		case DATA_WITHIN_CREATE_PROJECT_IS_LOADING:
			return action.payload;
		default:
			return state;
	}
}