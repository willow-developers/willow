import React from 'react';
import ModalContent from './ModalContent';
import styles from '../../assets/sass/Modal.module.scss';

const Modal = () => {
	return (
		<div className={ styles.overlay }>
			<ModalContent />
		</div>
	);
}

export default Modal;