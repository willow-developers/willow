import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';

import MyPortal from './MyPortal';
import Modal from './Modal';

class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item,i) => (
      <MyPortal key={ i } >
        <Modal item={ item } onClose={ (item) => this.props.dispatch(closeModal(item)) }/>
      </MyPortal>
    ))
    return (
      <div className="modals">
        {modals}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('from Modals: ', state.isModalOpen)
  return {
    modals: state.isModalOpen.modals
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
