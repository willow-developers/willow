import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, previewToggleNote, createNoteView, closeNoteView, editNote, updateNote } from '../../actions/notes';

import CardList from './CardList';
import NotesForm from './NotesForm';

class NotesBody extends Component {
	render() {
		const { notes, previewToggleNote, addNote, noteShowForm, noteShowList, createNoteView, closeNoteView, editNote, noteEdit, updateNote } = this.props;
		return (
			<div>
				{ noteShowList ? <CardList notes={ notes } previewToggleNote={ previewToggleNote } editNote={ editNote } /> : '' }
				{ noteShowForm ? <NotesForm closeNoteView={ closeNoteView } addNote={ addNote } noteEdit={ noteEdit } updateNote={ updateNote } /> : '' }
				<button onClick={ () => createNoteView() }>New</button>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  noteShowForm: state.noteShowForm,
  noteShowList: state.noteShowList,
  noteEdit: state.noteEdit,
});

const mapDispatchToProps = (dispatch) => ({
  addNote: (data) => dispatch(addNote(data)),
  previewToggleNote: (id) => dispatch(previewToggleNote(id)),
  createNoteView: () => dispatch(createNoteView()),
  closeNoteView: () => dispatch(closeNoteView()),
  editNote: (data) => dispatch(editNote(data)),
  updateNote: (data) => dispatch(updateNote(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesBody);
