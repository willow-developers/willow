import { ADD_MILESTONE, TOGGLE_MILESTONE, EDIT_MILESTONE, UPDATE_MILESTONE, SET_VISIBILITY_FILTER, LOAD } from "./types";

export const milestoneAdd = text => ({ type: ADD_MILESTONE, text });
export const milestoneToggle = id => ({ type: TOGGLE_MILESTONE, id });
export const milestoneEdit = id => ({ type: EDIT_MILESTONE, id });
export const milestoneUpdate = data => ({ type: UPDATE_MILESTONE, data });
export const milestoneFilter = filter => ({ type: SET_VISIBILITY_FILTER, filter });
export const load = data => ({ type: LOAD, data });


export const createMilestone = data => dispatch => {
  dispatch(milestoneAdd(data.text));
};

export const toggleMilestone = data => dispatch => {
  dispatch(milestoneToggle(data));
};

export const editMilestone = id => dispatch => {
  dispatch(milestoneEdit(id));
};

export const updateMilestone = data => dispatch => {
  dispatch(milestoneUpdate(data));
};

export const filterMilestone = filter => dispatch => {
  dispatch(milestoneFilter(filter));
};