import { ADD_NOTE, TOGGLE_PREVIEW_NOTE, NOTE_SHOW_FORM, NOTE_SHOW_LIST, EDIT_NOTE, UPDATE_NOTE, RESET_NOTE } from '../actions/types';

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
    case UPDATE_NOTE:
      const { title, content, id } = action.data;
      if (state.id !== id) {
        return state;
      }
      return {
        ...state,
        content,
        title,
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

export const noteEdit = (state = { id: '', title: '', content: '' }, action) => {
  switch (action.type) {
    case EDIT_NOTE:
      return action.editNote;
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
    case UPDATE_NOTE:
      return state.map(n => noteUpdate(n, action));
    case RESET_NOTE:
      return [];
    default:
      return state;
  }
};
