import { ADD_MILESTONE, TOGGLE_MILESTONE, EDIT_MILESTONE, UPDATE_MILESTONE, SET_VISIBILITY_FILTER, LOAD } from "../actions/types";

const initalState = {
  data: [],
  counter: 1
};

const milestone = (state = initalState, action) => {
  switch (action.type) {
    case ADD_MILESTONE:
      return {
        id: state.counter++,
        text: action.text,
        completed: false,
        edit: false
      };
    case TOGGLE_MILESTONE:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    case EDIT_MILESTONE:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        edit: !state.edit
      };
    case UPDATE_MILESTONE:
      if (state.id !== action.data.id) {
        return state;
      }
      return {
        ...state,
        text: action.data.text,
        edit: !state.edit
      };
    default:
      return state;
  }
};

export const milestones = (state = initalState.data, action) => {
  switch (action.type) {
    case ADD_MILESTONE:
      return [...state, milestone(undefined, action)];
    case TOGGLE_MILESTONE:
      return state.map(t => milestone(t, action));
    case EDIT_MILESTONE:
      return state.map(t => milestone(t, action));
    case UPDATE_MILESTONE:
      return state.map(t => milestone(t, action));
    default:
      return state;
  }
};

export const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export const milestoneLoader = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return {
        data: action.data
      };
    default:
      return state;
  }
};

