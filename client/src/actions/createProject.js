import axios from 'axios';
import { 
  CREATE_PROJECT_ADD_PROJECT_TITLE,
  CREATE_PROJECT_ADD_MILESTONES,
  CREATE_PROJECT_SAVE_PROJECT,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING
} from '../actions/types';

export const handleProjectNaming = projectName => ({
  type: CREATE_PROJECT_ADD_PROJECT_TITLE,
  payload: projectName
});

export const handleAddMilestones = milestones => ({
  type: CREATE_PROJECT_ADD_MILESTONES,
  payload: milestones
});

export const handleSaveProject = projectDetails => dispatch => {
  // MAYBE:
  // dispatch(createProjectIsLoading(true));
  
  // UPDATE AS NEEDED:
  // axios.post(TBD_URL, {
  //   data: projectData,
  // }).then(resp => {

  // }).catch(err => {
    
  // });

};

// MAYBE:
// export const createProjectIsLoading = boolean => ({
//   type: 'TYPE_GOES_HERE',
//   payload: boolean
// });