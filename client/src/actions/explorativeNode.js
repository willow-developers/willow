import axios from 'axios';
// import * as d3 from 'd3';
import { NEW_EXPLORATIVE_NODE_CREATED, PROJECT_SUCCESS} from './types';
import {projectGetData} from './project';

export const newExplorativeNodeCreated = (projectData) => ({ type: NEW_EXPLORATIVE_NODE_CREATED, projectData: projectData });

export const newExplorativeNodeCreate = (dataObject) => { 
    let projectID = dataObject.project_id;
    return (dispatch) => {
        axios.post('/api/projectData/newExplorativeNode', dataObject).then(() => {
            dispatch(projectGetData(projectID));
        })

    }
}