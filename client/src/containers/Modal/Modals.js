import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';

import ModalRender from '../../modalRoot';
import ModalActions from './ModalActions';

class Modals extends Component {
  render() {
    console.log('this.props.modals within modals.js!!', this.props.modals);
    const modals = this.props.modals.map((item,i) => {
      
      // work around to change the modal type for createNewProject modal
      // without refactoring entire modal system
      if (item.id === 4) {
        item.type = 'newProject';
      }

      return (
        <ModalRender key={ i } >
          <ModalActions
            item={ item }
            onClose={ (item) => this.props.dispatch(closeModal(item)) }
          />
        </ModalRender>
      );
    });

    return (
      <div className="modals">
        { modals }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modals: state.isModalOpen.modals
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
