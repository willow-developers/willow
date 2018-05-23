import { WINDOW_SIZE_WIDTH, WINDOW_SIZE_HEIGHT } from '../actions/types';

const initialState = {
	screenWidth: typeof window === 'object' ? window.innerWidth : null,
	screenHeight: typeof window === 'object' ? window.innerHeight : null,
};

export function uiReducer(state = initialState, action) {
	switch (action.type) {
		case WINDOW_SIZE_WIDTH:
			return Object.assign({}, state, {
				screenWidth: action.screenWidth
			});
		case WINDOW_SIZE_HEIGHT:
			return Object.assign({}, state, {
				screenHeight: action.screenHeight
			});
		default:
      return state;
	}
}