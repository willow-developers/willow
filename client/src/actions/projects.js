import axios from 'axios';

import {
    PROJECTS_LIST_IS_LOADING,
    PROJECTS_LIST_HAS_ERRORED,
    PROJECTS_LIST_SUCCESS
} from './types';

export const projectsListHasErrored = (bool) => ({
    type: PROJECTS_LIST_HAS_ERRORED,
    projectsListHasErrored: bool,
});
export const projectsListIsLoading = (bool) => ({
    type: PROJECTS_LIST_IS_LOADING,
    projectsListIsLoading: bool,
});

export const projectsListSuccess = (projectsList) => ({
    type: PROJECTS_LIST_SUCCESS,
    projectsList: projectsList
});

export const projectsGetList = (userID) => { 
    return (dispatch) => {
        dispatch(projectsListIsLoading(true));
        axios.get('/api/projects', { params: {userID}})
            .then(response => {
                dispatch(projectsListIsLoading(false));
                let projectsList = response.data;
                return projectsList;
            })
            .then(projectsList => dispatch(projectsListSuccess(projectsList)))
            .catch(() => dispatch(projectsListHasErrored(true)));
    };
};