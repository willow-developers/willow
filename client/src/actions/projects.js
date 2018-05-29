import axios from 'axios';

import {
    PROJECTS_LIST_IS_LOADING,
    PROJECTS_LIST_HAS_ERRORED,
    PROJECTS_LIST_SUCCESS,
    PROJECT_TITLE,
    RESET_TITLE,
    EDIT_TITLE,
    EDIT_FORM_TITLE,
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

export const nodeTitle = (str) => ({ type: PROJECT_TITLE, projectTitle: str });
export const resetNodeTitle = () => ({ type: RESET_TITLE, payload: "" });
export const editTitle = (bool) => ({ type: EDIT_TITLE, showTitle: bool });
export const editTitleForm = (bool) => ({ type: EDIT_FORM_TITLE, showFormTitle: bool });

export const titleNode = (str) => (dispatch) => {
  dispatch(nodeTitle(str));
};

export const titleFormShow = () => (dispatch) => {
  dispatch(editTitle(false));
  dispatch(editTitleForm(true));
};

export const titleEdit = () => (dispatch) => {
  dispatch(editTitleForm(false));
  dispatch(editTitle(true));
};

export const projectsGetList = (userID) => { 
    return (dispatch) => {
        dispatch(projectsListIsLoading(true));
        axios
            .get('/api/projects', { params: {userID}})
            .then(response => {
                dispatch(projectsListIsLoading(false));
                let projectsList = response.data;
                return projectsList;
            })
            .then(projectsList => dispatch(projectsListSuccess(projectsList)))
            .catch(() => dispatch(projectsListHasErrored(true)));
    };
};