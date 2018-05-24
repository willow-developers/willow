import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modalClose } from '../../actions/modal';

import styles from '../../assets/sass/Modal.module.scss';
import Button from '../../components/UI/Button';

import ModalRender from '../../modalRoot';

class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item, i) => {
      const onClose = () => {
        if(item.onClose){
          item.onClose();
          this.props.modalClose(item);
        } else {
          this.props.modalClose(item);
        }
      }

      return (
        <ModalRender key={ i } >
          <div className={ styles.modal_overlay }>
            <div className={ styles.modal }>
              <div className={ styles.row }>
                <div className={`${ styles.col_12_of_12 } ${ styles.btn_bar }`}>
                  <Button
                    icon={ 'close' }
                    type={ 'round' }
                    btnFloat={ 'right' }
                    styleClass={ 'closeModal' }
                    handleClick={ () => onClose() }
                  />
                </div>
                <div className={`${ styles.col_12_of_12 } ${ styles.modal_content }`}>
                  { item.content }
                </div>
              </div>
            </div>
          </div>
        </ModalRender>
      );
    });

    return <div>{ modals }</div>;
  }
}

const mapStateToProps = (state) => ({
  modals: state.isModalOpen.modals
});

const mapDispatchToProps = (dispatch) => ({
  modalClose: (obj) => dispatch(modalClose(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modals);