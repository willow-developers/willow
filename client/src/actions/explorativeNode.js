import axios from 'axios';
import { NEW_EXPLORATIVE_NODE_CREATED, PROJECT_SUCCESS } from './types';
import { projectGetData } from './project';

export const newExplorativeNodeCreated = (projectData) => ({
  type: NEW_EXPLORATIVE_NODE_CREATED,
  projectData: projectData,
});


export const newExplorativeNodeCreate = (dataObject) => {
  let projectID = dataObject.project_id;
  return (dispatch) => {
    axios
      .post('/api/projectData/newExplorativeNode', dataObject)
      .then(() => {
        dispatch(projectGetData(projectID));
      });
  };
};



// SAVE_EXPLORATIVE_NODE, EXPLORATIVE_HAS_ERRORED, EXPLORATIVE_IS_LOADING, EXPLORATIVE_HAS_SAVED, LOAD_EXPLORATIVE_NODE

// export const explorativeHasErrored = (bool) => ({ type: EXPLORATIVE_HAS_ERRORED, hasErrored: bool });
// export const explorativeHasSaved = (bool) => ({ type: EXPLORATIVE_HAS_SAVED, hasSaved: bool });
// export const explorativeIsLoading = (bool) => ({ type: EXPLORATIVE_IS_LOADING, isLoading: bool });

// export const explorativeDataSave = (obj) => ({ type: SAVE_EXPLORATIVE_NODE, explorativeDataSave: obj });
// export const explorativeDataLoad = (obj) => ({ type: LOAD_EXPLORATIVE_NODE, explorativeDataLoad: obj });

// export const saveExplorativeData = (obj) => ((dispatch) => {
//   console.log('from the actions: ', obj)
//   // axios.post('/api/saveExplorative', obj)
//   //   .then((response) => dispatch(explorativeHasSaved(true)))
//   //   .catch(() => dispatch(explorativeHasErrored(true)));
//   }
// );