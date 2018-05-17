import {
	CREATE_PROJECT_ADD_PROJECT_TITLE,
  CREATE_PROJECT_ADD_MILESTONES,
	CREATE_PROJECT_SAVE_PROJECT,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING
} from '../actions/types';

export function createProjectModalToShow(state = 'NewProjectTitle', action) {
	switch (action.type) {
		case CREATE_PROJECT_ADD_PROJECT_TITLE:
      return 'AddProjectDetails';
		case CREATE_PROJECT_ADD_MILESTONES:
			return 'ProjectSummary';
		case CREATE_PROJECT_SAVE_PROJECT:
			return 'NewProjectTitle';
		default:
			return state;
	}
}

export function createProjectMilestones(state = [], action) {
	switch (action.type) {
		case CREATE_PROJECT_ADD_MILESTONES:
			return action.payload;
		case CREATE_PROJECT_SAVE_PROJECT:
			return '';
		default:
			return state;
	}
}

export function createProjectTitle(state = '', action) {
	switch (action.type) {
		case CREATE_PROJECT_ADD_PROJECT_TITLE:
      return action.payload.projectName;
		case CREATE_PROJECT_SAVE_PROJECT:
			return [];
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

export function shouldRedirect(state = false, action) {
	switch (action.type) {
		case CREATE_PROJECT_SAVE_PROJECT:
			return true;
		default:
			return state;
	}
}

export function shouldRedirectTo(state = null, action) {
	switch (action.type) {
		case CREATE_PROJECT_SAVE_PROJECT:
			return action.payload;
		default:
			return state;
	}
}