import { WINDOW_SIZE } from '../actions/types';

const initialState = {
	screenWidth: typeof window === 'object' ? window.innerWidth : null
};

export function uiReducer(state = initialState, action) {
	switch (action.type) {
		case WINDOW_SIZE:
			return Object.assign({}, state, {
				screenWidth: action.screenWidth
			});
		default:
      return state;
	}
}