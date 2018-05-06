import { FETCH_USER } from '../actions/types';

// for the user login we are going to have 3 conditions
// 1. as we wait for the async to come back we send back `null` and that will show no buttons
// 2. if the user is not logged in it will return `false` which will render the login button.
// if the user is logged in it will return the user id and render all the buttons and the logout button.
export default function(state = null, action) {
	// console.log(action);
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}