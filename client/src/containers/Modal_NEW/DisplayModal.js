import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalClose, modalOpen } from '../../actions/modal';
import { closeBookmark } from '../../actions/bookmarks';

import Modals from './Modals';
import Button from '../../components/UI/Button';

class DisplayModal extends Component {
  render() {

    const { content, id, name } = this.props;

    const onOpen = (obj) => {
      this.props.modalOpen(obj);
    }

    const onClose = (obj) => {
      this.props.modalClose(obj);
    }

    return (
      <div>
        <Button
	        value={ 'Open custom modal' }
	        icon={ 'create' }
	        iconSide={ 'left' }
	        handleClick={() => onOpen({
	          id,
	          onClose: () => this.props.closeBookmark(),
	          onConfirm: () => console.log("fire at confirming event on custom"),
	          content,
	        })}
	      />
        <Modals onClose={ onClose } name={ name } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ modals: state.isModalOpen.modals });
const mapDispatchToProps = (dispatch) => ({
  modalClose: (obj) => dispatch(modalClose(obj)),
  modalOpen: (obj) => dispatch(modalOpen(obj)),
  closeBookmark: () => dispatch(closeBookmark())
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);