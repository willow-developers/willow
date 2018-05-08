import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';

import ModalRender from '../../modalRoot';
import ModalActions from './ModalActions';

class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item,i) => (
      <ModalRender key={ i } >
        <ModalActions
          item={ item }
          onClose={ (item) => this.props.dispatch(closeModal(item)) }
        />
      </ModalRender>
    ))
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
