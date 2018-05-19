import {
  ADD_NOTE,
  TOGGLE_PREVIEW_NOTE,
  NOTE_SHOW_FORM,
  NOTE_SHOW_LIST
} from "./types";

export const noteAdd = (data) => ({ type: ADD_NOTE, data });
export const noteTogglePreview = (id) => ({ type: TOGGLE_PREVIEW_NOTE, id });

export const noteShowForm = (bool) => ({ type: NOTE_SHOW_FORM, showForm: bool });
export const noteShowList = (bool) => ({ type: NOTE_SHOW_LIST, showList: bool });


export const addNote = (data) => (dispatch) => {
  dispatch(noteAdd(data));
};

export const previewToggleNote = (id) => (dispatch) => {
  dispatch(noteTogglePreview(id));
};

export const createNoteView = () => (dispatch) => {
  dispatch(noteShowForm(true));
  dispatch(noteShowList(false));
};

export const closeNoteView = () => (dispatch) => {
  dispatch(noteShowList(true));
  dispatch(noteShowForm(false));
};