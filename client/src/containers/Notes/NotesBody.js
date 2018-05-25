import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, previewToggleNote, createNoteView, closeNoteView, editNote, updateNote, deleteNote } from '../../actions/notes';

import CardList from './CardList';
import NotesForm from './NotesForm';
import Button from '../../components/UI/Button';
import styles from '../../assets/sass/NotesBody.module.scss';

class NotesBody extends Component {
	render() {
		const {
			notes,
			previewToggleNote,
			addNote,
			noteShowForm,
			noteShowList,
			createNoteView,
			closeNoteView,
			editNote,
			noteEdit,
			updateNote,
			deleteNote
		} = this.props;

		return (
			<div className={ styles.row }>
				<div className={ styles.col_12_of_12 }>
          im the title!
        </div>
				<div className={` ${styles.col_12_of_12} ${styles.listHolder} `}>
					{ noteShowList
						? (<CardList notes={ notes } previewToggleNote={ previewToggleNote } editNote={ editNote } deleteNote={ deleteNote } />)
						: '' }
					{ noteShowForm ? <NotesForm closeNoteView={ closeNoteView } addNote={ addNote } noteEdit={ noteEdit } updateNote={ updateNote } /> : '' }
					{ noteShowForm ? '' : <div className={ styles.btnBar }><Button type={ 'bigRound' } icon={ 'add' } btnFloat={ 'right' } handleClick={ () => createNoteView() } /></div> }
				</div>
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
	deleteNote: (idx) => dispatch(deleteNote(idx))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesBody);
