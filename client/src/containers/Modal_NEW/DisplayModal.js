import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalClose, modalOpen } from '../../actions/modal';
import { closeBookmark } from '../../actions/bookmarks';
import { resetProjectBuilder } from '../../actions/createProject';

import Modals from './Modals';
import Button from '../../components/UI/Button';

class DisplayModal extends Component {
  render() {

    const { content, id, name, value, size, modalType } = this.props;

    const onOpen = (obj) => {
      this.props.modalOpen(obj);
    }

    const onClose = (obj) => {
      this.props.modalClose(obj);
    }

    if (modalType === 'Explorative') {

      return (
        <div>
          <Button
            value={ value }
            icon={ 'create' }
            iconSide={ 'left' }
            type={ size }
            handleClick={() => onOpen({
              id,
              onClose: () => this.props.closeBookmark(),
              // onConfirm: () => console.log("fire at confirming event on custom"),
              content,
            })}
          />
          <Modals onClose={ onClose } name={ name } />
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
          <Modals onClose={ onClose } name={ name } />
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  modals: state.isModalOpen.modals
});

const mapDispatchToProps = (dispatch) => ({
  modalClose: (obj) => dispatch(modalClose(obj)),
  modalOpen: (obj) => dispatch(modalOpen(obj)),
  closeBookmark: () => dispatch(closeBookmark()),
  resetProjectBuilder: () => dispatch(resetProjectBuilder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);