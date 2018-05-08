import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

import Button from '../../../components/UI/Button';

class Custom extends Component {
  render() {
    return (
      <Button
        value={ 'Open custom modal' }
        icon={ 'create' }
        iconSide={ 'left' }
        handleClick={() => this.props.dispatch(openModal({
          id: 2,
          type: 'custom',
          onClose: () => console.log("fire at closing event on custom"),
          onConfirm: () => console.log("fire at confirming event on custom"),
          content: this.props.body
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

export default connect(mapStateToProps, mapDispatchToProps)(Custom);
