import React from 'react';
import styles from '../../assets/sass/Modal.module.scss';

const ModalContent = () => {
	return (
		<div className={ styles.modal_container }>
			<div className={ styles.content }>
				I'm a Modal! I'll have an inner component that holds the content, this is just for the overlay and the modal contain itself.
			</div>
		</div>
	);
}

export default ModalContent;