import { NEW_EXPLORATIVE_NODE_CREATED } from '../actions/types';

export function newExplorativeNodeCreated(state = {nodes:[], links:[]}, action) {
    switch (action.type) {
		case NEW_EXPLORATIVE_NODE_CREATED:
			console.log('success');
			return action.projectData;
		default:
			return state;
	}
}