import { OPEN_MODAL, CLOSE_MODAL } from './types';

export function openModal(obj) {
	return {
		type: OPEN_MODAL,
		obj
	};
}

export function closeModal(obj) {
	return {
		type: CLOSE_MODAL,
		obj
	};
}

