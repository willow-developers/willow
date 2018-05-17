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

export const resetProjectBuilder = () => ({
  type: CREATE_PROJECT_SAVE_PROJECT,
  payload: null,
});

export const handleSaveProject = projectDetails => dispatch => {
  dispatch(createProjectIsLoading(true));
  
  // UPDATE AS NEEDED:
  axios.post('/api/newProject', {
    data: projectDetails,
  }).then(resp => {
    console.log('resp in createProject.js: ', resp);
    dispatch(resetProjectBuilder());
    dispatch(createProjectIsLoading(false));
  }).catch(err => {
    console.log('err: ', err);
    dispatch(resetProjectBuilder());
    dispatch(createProjectIsLoading(false));
  });

};

export const createProjectIsLoading = boolean => ({
  type: 'TYPE_GOES_HERE',
  payload: boolean
});