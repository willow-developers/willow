import {
  ADD_NOTE,
  TOGGLE_PREVIEW_NOTE,
  NOTE_SHOW_FORM,
  NOTE_SHOW_LIST,
  EDIT_NOTE,
  UPDATE_NOTE,
} from "./types";

export const noteAdd = (data) => ({ type: ADD_NOTE, data });
export const noteTogglePreview = (id) => ({ type: TOGGLE_PREVIEW_NOTE, id });

export const noteShowForm = (bool) => ({ type: NOTE_SHOW_FORM, showForm: bool });
export const noteShowList = (bool) => ({ type: NOTE_SHOW_LIST, showList: bool });

export const noteEdit = (data) => ({ type: EDIT_NOTE, editNote: data });
export const noteUpdate = (data) => ({ type: UPDATE_NOTE, data });


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
	dispatch(noteEdit({ id: '', title: '', content: '' }));
  dispatch(noteShowList(true));
  dispatch(noteShowForm(false));
};

export const editNote = (data) => (dispatch) => {
	dispatch(noteEdit(data));
  dispatch(noteShowForm(true));
  dispatch(noteShowList(false));
};

export const updateNote = (data) => (dispatch) => {
  dispatch(noteUpdate(data));
};