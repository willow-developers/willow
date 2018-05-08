import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';

import CustomModalContent from './CustomModalContent';
import Modals from './Modals';

import '../../assets/sass/DisplayModal.scss';

class DisplayModal extends Component {
  render() {
    return (
      <div className="App">
        <button className="test-button" onClick={() => this.props.dispatch(openModal({
          id: 1,
          type: 'confirmation',
          text: 'Are you sure to do this?',
          onClose: () => console.log("fire at closing event"),
          onConfirm: () => console.log("fire at confirming event"),
        }))}>Open confirmation modal</button>

        <button className="test-button" onClick={() => this.props.dispatch(openModal({
          id: 2,
          type: 'custom',
          content: <CustomModalContent />
        }))}>Open custom modal</button>

        <Modals />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isModalOpen: state.isModalOpen };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);
