import { ADD_MILESTONE, POPULATE_MILESTONE, TOGGLE_MILESTONE, EDIT_MILESTONE, UPDATE_MILESTONE, SET_VISIBILITY_FILTER, LOAD, SET_VISIBILITY_FILTER_COLUMN } from "../actions/types";

const initalState = {
  data: [],
  counter: 1
};

const milestoneAdd = (state = initalState, action) => {
  switch (action.type) {
    case ADD_MILESTONE:
      const { text, column } = action.text;
      return {
        column,
        id: state.counter++,
        text,
        completed: false,
        edit: false
      };
    case POPULATE_MILESTONE:
      console.log('from reducer: ', action.data);
      // const { text, column, id } = action.data;
      // return state;
      return {
        id: action.data.id,
        text: action.data.text,
        column: action.data.column,
        completed: false,
        edit: false
      };
    default:
      return state;
  }
};

const milestoneUpdate = (state = initalState, action) => {
  switch (action.type) {
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

export const milestones = (state = [], action) => {
  switch (action.type) {
    case ADD_MILESTONE:
      return [...state, milestoneAdd(undefined, action)];
    case POPULATE_MILESTONE:
      return [...state, milestoneAdd(undefined, action)];
    case TOGGLE_MILESTONE:
      return state.map(t => milestoneUpdate(t, action));
    case EDIT_MILESTONE:
      return state.map(t => milestoneUpdate(t, action));
    case UPDATE_MILESTONE:
      return state.map(t => milestoneUpdate(t, action));
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

export const visibilityFilterColumn = (state = "A", action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER_COLUMN:
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

