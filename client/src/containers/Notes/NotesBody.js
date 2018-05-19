import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNote, previewToggleNote, createNoteView, closeNoteView } from '../../actions/notes';

import CardList from './CardList';
import NotesForm from './NotesForm';

const dummyNotes = () => {
	return ({ title: 'I\'m a title', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida purus nec quam vulputate, ut consectetur elit sollicitudin. Maecenas lacinia diam sit amet lacus aliquet dictum. Ut in elit a felis accumsan condimentum eget et turpis. Phasellus porta arcu convallis, tincidunt mauris et, condimentum sapien. Suspendisse sollicitudin tempor erat sit amet consequat. Duis facilisis ligula in massa facilisis ullamcorper. Curabitur placerat, neque a eleifend rhoncus, nisl sem faucibus risus, sit amet eleifend velit ligula a tellus.' });
};


class NotesBody extends Component {
	render() {
		const { notes, previewToggleNote, addNote, noteShowForm, noteShowList, createNoteView, closeNoteView } = this.props;
		return (
			<div>
				{ noteShowList ? <CardList notes={ notes } previewToggleNote={ previewToggleNote } /> : '' }
				{ noteShowForm ? <NotesForm /> : '' }
				<button onClick={ () => createNoteView() }>New</button>
				<button onClick={ () => closeNoteView() }>close</button>
			</div>
		);
	}
};

const mapStateToProps = (state) => ({
  notes: state.notes,
  noteShowForm: state.noteShowForm,
  noteShowList: state.noteShowList,
});

const mapDispatchToProps = (dispatch) => ({
  addNote: (data) => dispatch(addNote(data)),
  previewToggleNote: (id) => dispatch(previewToggleNote(id)),
  createNoteView: () => dispatch(createNoteView()),
  closeNoteView: () => dispatch(closeNoteView()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesBody);
