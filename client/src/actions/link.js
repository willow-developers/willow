import axios from 'axios';
import { NEW_LINK_CREATED } from './types';
import { projectGetData } from './project';

export const newLinkCreate = (dataObject) => { 
    let projectID = dataObject.project_id;

    return (dispatch) => {
        axios
            .post('/api/projectData/newLink', dataObject)
            .then(() => {
                dispatch(projectGetData(project_id));
            });
    };
}