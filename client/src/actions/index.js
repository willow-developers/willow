import axios from 'axios';
import { FETCH_USER } from './types';

// export const fetchUser = () => {
// 	return function(dispatch) {
// 		axios.get('/api/current_user')
// 			.then((res) => dispatch({ type: FETCH_USER, payload: res }));
// 	}
// };

// fetchUser is called when the app loads to check weather or not the user is logged in.
// right now the endpoint this is hitting will always return false bc its hard coded that way.
// the above commented out code is the equivilent FYI.
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};
