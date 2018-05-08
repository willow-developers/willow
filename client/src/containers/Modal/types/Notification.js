import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

import Button from '../../../components/UI/Button';

class Notification extends Component {
  render() {
    const { header, level, text, id } = this.props.action;
    return (
      <Button
        value={ 'Open notification modal' }
        handleClick={() => this.props.dispatch(openModal({
          id,
          type: 'notification',
          header,
          text,
          value: level || 'error',
          onClose: () => console.log("fire at closing event on notification"),
        }))}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { isModalOpen: state.isModalOpen };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
