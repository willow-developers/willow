import React, { Component } from 'react';
import { connect } from 'react-redux';
import v4 from 'uuid/v4';
import { modalOpen } from '../../actions/modal';
import { resetProjectBuilder } from '../../actions/createProject';

import Modals from './Modals';
import Button from '../../components/UI/Button';

class DisplayModal extends Component {
  render() {
    const { content, id, value, size, modalType } = this.props;
    const onOpen = (obj) => {
      this.props.modalOpen(obj);
    }

    if (modalType === 'Milestones') {
      return (
        <div>
          <Button
            value={ value }
            icon={ 'create' }
            iconSide={ 'left' }
            type={ size }
            handleClick={() => onOpen({
              id: v4(),
              onClose: () => console.log('fire on close!'),
              content,
            })}
          />
          <Modals />
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
              content,
            })}
          />
          <Modals />
        </div>
      );
    }

  }
}

const mapStateToProps = (state) => ({
  modals: state.isModalOpen.modals,
});

const mapDispatchToProps = (dispatch) => ({
  modalOpen: (obj) => dispatch(modalOpen(obj)),
  resetProjectBuilder: () => dispatch(resetProjectBuilder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayModal);