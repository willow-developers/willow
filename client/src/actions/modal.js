import { OPEN_MODAL, CLOSE_MODAL } from './types';

export const openModal = (obj) => ({ type: OPEN_MODAL, obj });
export const closeModal = (obj) => ({ type: CLOSE_MODAL, obj });

export const modalClose = (obj) => ((dispatch) => {
	dispatch(closeModal(obj));
});

export const modalOpen = (obj) => ((dispatch) => {
	dispatch(openModal(obj));
});
