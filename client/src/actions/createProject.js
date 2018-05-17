import axios from 'axios';
import { 
  CREATE_PROJECT_ADD_PROJECT_TITLE,
  CREATE_PROJECT_ADD_MILESTONES,
  CREATE_PROJECT_SAVE_PROJECT,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING
} from '../actions/types';

import { closeModal } from './modal';

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

export const redirectTo = projectID => ({
  type: CREATE_PROJECT_SAVE_PROJECT,
  payload: projectID,
});

export const handleSaveProject = (projectDetails, modal) => dispatch => {
  dispatch(createProjectIsLoading(true));
  
  axios.post('/api/newProject', {
    data: projectDetails,
  }).then(data => {
    // turn off loading icon
    dispatch(createProjectIsLoading(false));
    
    // reset projectBuilding functionality
    dispatch(resetProjectBuilder());
    
    // close modal
    dispatch(closeModal(modal));
    
    // redirect to newly create project
    let projectID = data.data.project_id;
    dispatch(redirectTo(projectID));
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