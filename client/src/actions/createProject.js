import axios from 'axios';

import { 
  CREATE_PROJECT_ADD_PROJECT_TITLE,
  CREATE_PROJECT_ADD_MILESTONES,
  CREATE_PROJECT_SAVE_PROJECT,
  CREATE_PROJECT_HAS_ERRORED,
  DATA_WITHIN_CREATE_PROJECT_IS_LOADING,
  CREATE_PROJECT_HANDLE_NEW_ITEM,
  CREATE_PROJECT_DELETE_ITEM,
} from '../actions/types';

import { closeModal } from './modal';

export const handleProjectNaming = projectName => ({
  type: CREATE_PROJECT_ADD_PROJECT_TITLE,
  payload: projectName,
});

export const handleAddMilestones = milestones => ({
  type: CREATE_PROJECT_ADD_MILESTONES,
  payload: milestones,
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

  console.log({ projectDetails, modal });
  
  axios
    .post('/api/newProject', { data: projectDetails, })
    .then(data => {
      dispatch(createProjectIsLoading(false));
      dispatch(closeModal(modal));
      dispatch(resetProjectBuilder());
      
      // redirect to newly create project
      let projectID = data.data.project_id;
      console.log({ projectID });
      dispatch(redirectTo(projectID));
    })
    .catch(err => {
      console.log('err: ', err);
      dispatch(resetProjectBuilder());
      dispatch(createProjectIsLoading(false));
    });
};

export const handleAddItem = item => ({
  type: CREATE_PROJECT_HANDLE_NEW_ITEM,
  payload: item,
});

export const deleteItem = (idx, modal) => dispatch => {
  // in order to prevent multiple modals opening and the screen getting darker
  dispatch(closeModal(modal));
  dispatch(executeDelete(idx));
};

export const executeDelete = idx => ({
  type: CREATE_PROJECT_DELETE_ITEM,
  payload: idx,
});

export const createProjectIsLoading = boolean => ({
  type: 'TYPE_GOES_HERE',
  payload: boolean,
});