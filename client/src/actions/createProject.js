import axios from 'axios';
import { 
  CREATE_PROJECT_SHOW_ADD_DETAILS,
  CREATE_PROJECT_SHOW_NEW_PROJECT_FORM,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING
} from '../actions/types';

export const handleProjectNaming = projectName => ({
  type: 'TYPE_GOES_HERE',
  payload: projectName
});

export const handleCreateProject = projectData => (dispatch => {
  // MAYBE:
  // dispatch(createProjectIsLoading(true));
  
  // UPDATE AS NEEDED:
  // axios.post(TBD_URL, {
  //   data: projectData,
  // }).then(resp => {

  // }).catch(err => {
    
  // });

});

// MAYBE:
// export const createProjectIsLoading = boolean => ({
//   type: 'TYPE_GOES_HERE',
//   payload: boolean
// });