import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from "node-uuid";
import { modalClose, modalOpen } from '../../actions/modal';
import { closeBookmark } from '../../actions/bookmarks';
import { closeNoteView } from '../../actions/notes';
import { resetProjectBuilder } from '../../actions/createProject';
import { projectSave } from '../../actions/project';

import Modals from './Modals';
import Button from '../../components/UI/Button';

class DisplayModal extends Component {
  render() {

    const { content, id, value, size, modalType } = this.props;

    const onOpen = (obj) => {
      this.props.modalOpen(obj);
    }

    const onClose = (obj) => {
      this.props.modalClose(obj);
    }

    if (modalType === 'Explorative') {

      const closeSaveExplorative = () => {
        const saveExplorative = {};
        saveExplorative.bookmarks = this.props.bookmarkListAdd;
        saveExplorative.notes = this.props.notes;

        this.props.closeBookmark();
        this.props.closeNoteView();
        console.log(saveExplorative)
        // this.props.projectSave(saveExplorative);
      }

      return (
        <div>
          <Button
            value={ value }
            icon={ 'create' }
            iconSide={ 'left' }
            type={ size }
            handleClick={() => onOpen({
              id: uuid.v4(),
              onClose: () => closeSaveExplorative(),
              content,
              modalType
            })}
          />
          <Modals onClose={ onClose } />
        </div>
      );
    } else if (modalType === 'CreateProject') {
      return (
        <div>
          <Button
            value={ value }
            icon={ 'create' }
            iconSide={ 'left' }
            type={ size }
            handleClick={() => onOpen({
              id,
              onClose: () => this.props.resetProjectBuilder(),
              // onConfirm: () => console.log("fire at confirming event on custom"),
              content,
            })}
          />
          <Modals onClose={ onClose } />
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  modals: state.isModalOpen.modals,
  bookmarkListAdd: state.bookmarkListAdd,
  notes: state.notes,
});

const mapDispatchToProps = (dispatch) => ({
  modalClose: (obj) => dispatch(modalClose(obj)),
  modalOpen: (obj) => dispatch(modalOpen(obj)),
  closeBookmark: () => dispatch(closeBookmark()),
  closeNoteView: () => dispatch(closeNoteView()),
  resetProjectBuilder: () => dispatch(resetProjectBuilder()),
  projectSave: (obj) => dispatch(projectSave(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);