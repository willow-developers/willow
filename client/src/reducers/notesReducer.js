import { ADD_NOTE, TOGGLE_PREVIEW_NOTE, NOTE_SHOW_FORM, NOTE_SHOW_LIST } from '../actions/types';

const initalState = {
  counter: 1,
  createdAt: () => Date()
};

const noteAdd = (state = initalState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      const { content, title } = action.data;
      return {
        content,
        title,
        id: state.counter++,
        createdAt: state.createdAt(),
        togglePreview: false,
      };
    default:
      return state;
  }
};

const noteUpdate = (state = initalState, action) => {
  switch (action.type) {
    case TOGGLE_PREVIEW_NOTE:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        togglePreview: !state.togglePreview
      };
    default:
      return state;
  }
};

export const noteShowForm = (state = false, action) => {
  switch (action.type) {
    case NOTE_SHOW_FORM:
      return action.showForm;
    default:
      return state;
  }
}

export const noteShowList = (state = true, action) => {
  switch (action.type) {
    case NOTE_SHOW_LIST:
      return action.showList;
    default:
      return state;
  }
}

export const notes = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, noteAdd(undefined, action)];
    case TOGGLE_PREVIEW_NOTE:
      return state.map(n => noteUpdate(n, action));
    default:
      return state;
  }
};
