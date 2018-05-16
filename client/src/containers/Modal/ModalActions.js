import React, { Component } from 'react';
import classNames from 'classnames';
import styles from '../../assets/sass/Modal.module.scss';

import Button from '../../components/UI/Button';

class Modal extends Component {
  onClose(){
    if(this.props.item.onClose){
      this.props.item.onClose();
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }
  onConfirm(){
    if(this.props.item.onConfirm){
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }
  render() {
    const { type, text, header, content, value } = this.props.item;

    const _modalClassNames = (styles) => (
      classNames(styles.modal, {
        [styles.confirmation]: type === 'confirmation',
        [styles.error]: value === 'error',
        [styles.success]: value === 'success',
        [styles.warning]: value === 'warning',
      })
    );

    const _modalContentClassNames = (styles) => (
      classNames([styles.modal_content, styles.col_12_of_12], {
        [styles.custom]: type === 'custom',
        [styles.notification]: type === 'notification',
      })
    );

    const _btnBarClassNames = (styles) => (
      classNames([styles.btn_bar, styles.col_12_of_12], {
        [styles.notification]: type === 'notification',
      })
    );

    console.log('this.props within ModalActions: ', this.props);

    if (type === 'confirmation') {
      return (
        <div className={ styles.modal_overlay }>
          <div className={ _modalClassNames(styles) }>
            <div className={ styles.row }>
              <div className={ _modalContentClassNames(styles) }>
                <h3 className={ styles.title }>{ header }</h3>
                <p className={ styles.message }>{ text }</p>
              </div>
              <div className={`${ styles.col_12_of_12 } ${ styles.btn_bar }`}>
                <Button
                  value={ 'Confirm' }
                  handleClick={ () => this.onConfirm() }
                  icon={ 'check' }
                  iconSide={ 'left' }
                />
                <Button
                  value={ 'Close' }
                  icon={ 'close' }
                  iconSide={ 'right' }
                  btnFloat={ 'right' }
                  styleClass={ 'closeModal' }
                  handleClick={ () => this.onClose() }
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else if (type === 'custom') {
      return (
        <div className={ styles.modal_overlay }>
          <div className={ _modalClassNames(styles) }>
            <div className={ styles.row }>
              <div className={ _modalContentClassNames(styles) }>
                { content }
              </div>
              <div className={`${ styles.col_12_of_12 } ${ styles.btn_bar }`}>
                <Button
                  value={ 'Confirm' }
                  handleClick={ () => this.onConfirm() }
                  icon={ 'check' }
                  iconSide={ 'left' }
                />
                <Button
                  value={ 'Close' }
                  icon={ 'close' }
                  iconSide={ 'right' }
                  btnFloat={ 'right' }
                  styleClass={ 'closeModal' }
                  handleClick={ () => this.onClose() }
                />
              </div>
            </div>
          </div>
        </div>
      )
    } else if (type === 'notification') {
      return (
        <div className={ styles.modal_overlay_notification }>
          <div className={ _modalClassNames(styles) }>
            <div className={ styles.row }>
              <div className={ _modalContentClassNames(styles) }>
                <h3 className={ styles.title }>{ header }</h3>
                <p className={ styles.message }>{ text }</p>
              </div>
              <div className={_btnBarClassNames(styles)}>
                <Button
                  icon={ 'close' }
                  styleClass={ 'closeNotification' }
                  type={ 'round' }
                  handleClick={ () => this.onClose() }
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type === 'newProject') {
      return (
        <div className={ styles.modal_overlay }>
          <div className={ _modalClassNames(styles) }>
            <div className={ styles.row }>
              <div className={ _modalContentClassNames(styles) }>
                { content }
              </div>
              <div className={_btnBarClassNames(styles)}>
                <Button
                  icon={ 'close' }
                  styleClass={ 'closeNotification' }
                  type={ 'round' }
                  handleClick={ () => this.onClose() }
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

export default Modal;