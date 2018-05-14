import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

import Button from '../../../components/UI/Button';

class Custom extends Component {
  render() {
    console.log('this.props in custom modal: ', this.props);
    return (
      <Button
        value={ this.props.value }
        icon={ this.props.icon }
        iconSide={ 'left' }
        handleClick={() => this.props.dispatch(openModal({
          id: this.props.id,
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
