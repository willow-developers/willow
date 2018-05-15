import axios from 'axios';
// import * as d3 from 'd3';
import { NEW_LINK_CREATED} from './types';
import {projectGetData} from './project';

// export const newLinkCreated = (projectData) => ({ type: NEW_LINK_CREATED, projectData: projectData });


export const newLinkCreate = (dataObject) => { 
    let projectID = dataObject.project_id;
    return (dispatch) => {
        axios.post('/api/projectData/newLink', dataObject).then(() => {
            dispatch(projectGetData(projectID));
        })
    }
}