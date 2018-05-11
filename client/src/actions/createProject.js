import axios from 'axios';
import { /* TBD */ } from './types';

export const handleCreateProject = projectData => (dispatch => {
  // MAYBE:
  dispatch(createProjectIsLoading(true));
  
  // UPDATE AS NEEDED:
  axios.post(TBD_URL, {
    data: projectData,
  }).then(resp => {

  }).catch(err => {
    
  });

});

export const handleProjectNaming = projectName => ({
  type: 'TYPE_GOES_HERE',
  payload: projectName
});

// MAYBE:
// export const createProjectIsLoading = boolean => ({
//   type: 'TYPE_GOES_HERE',
//   payload: boolean
// });