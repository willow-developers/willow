import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../../assets/sass/Modal.module.scss';
import Button from '../../components/UI/Button';

import ModalRender from '../../modalRoot';

class Modals extends Component {
  componentDidUpdate() {
    const modalHeight = this.modalHeight.clientHeight;
    const topBtnBar = this.topBtnBar.clientHeight;
    console.log('modalHeight: ', modalHeight);
    console.log('topBtnBar: ', topBtnBar);
    // this.setState({ height });
  }
  render() {
    const modals = this.props.modals.map((item, i) => {
      const onClose = () => {
        if(item.onClose){
          item.onClose();
          this.props.onClose(item);
        } else {
          this.props.onClose(item);
        }
      }

      // const onConfirm = () => {
      //   if(item.onConfirm){
      //     item.onConfirm();
      //     this.props.onClose(item);
      //   }
      // }

      return (
        <ModalRender key={ i } >
          <div className={ styles.modal_overlay }>
            <div className={ styles.modal } ref={ (modalHeight) => this.modalHeight = modalHeight}>
              <div className={ styles.row }>
                <div className={`${ styles.col_12_of_12 } ${ styles.btn_bar }`} ref={ (topBtnBar) => this.topBtnBar = topBtnBar}>
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

export default connect(mapStateToProps)(Modals);