import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../../actions/modal';

import Button from '../../../components/UI/Button';

class Confirmation extends Component {
  render() {
    return (
      <div>
        <Button
          value={ 'Open confirmation modal' }
          icon={ 'account_circle' }
          iconSide={ 'left' }
          type={ this.props.size }
          handleClick={() => this.props.dispatch(openModal({
            id: 1,
            type: 'confirmation',
            header: 'Hold Up!',
            text: 'Are you sure you want to do that? All your changes will be lost.',
            onClose: () => console.log("fire at closing event"),
            onConfirm: () => console.log("fire at confirming event"),
          }))}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
