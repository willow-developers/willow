import axios from 'axios';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter';

import { BOOKMARK_HAS_ERRORED, BOOKMARK_IS_LOADING } from './types';
import { BOOKMARK_SHOW_ADD, BOOKMARK_SHOW_PREVIEW, BOOKMARK_SHOW_EDIT } from './types';
import { BOOKMARK_STATUS_SUCCESS, BOOKMARK_FIELDS_SUCCESS, LOAD_BOOKMARK_SCRAPE, SAVE_BOOKMARK } from './types';

export const bookmarkHasErrored = (bool) => ({ type: BOOKMARK_HAS_ERRORED, hasErrored: bool });
export const bookmarkIsLoading = (bool) => ({ type: BOOKMARK_IS_LOADING, isLoading: bool });

export const bookmarkShowAdd = (bool) => ({ type: BOOKMARK_SHOW_ADD, showAdd: bool });
export const bookmarkShowPreview = (bool) => ({ type: BOOKMARK_SHOW_PREVIEW, showPreview: bool });
export const bookmarkShowEdit = (bool) => ({ type: BOOKMARK_SHOW_EDIT, showEdit: bool });

export const bookmarkStatusSuccess = (status) => ({ type: BOOKMARK_STATUS_SUCCESS, bookmarkStatus: status });
export const bookmarkFieldsSuccess = (status) => ({ type: BOOKMARK_FIELDS_SUCCESS, bookmarkFields: status });
export const loadFormData = (data) => ({ type: LOAD_BOOKMARK_SCRAPE, data });

export const BookmarkSave = (data) => ({ type: SAVE_BOOKMARK, data });

export const bookmarkGetInfo = (targetUrl) => ((dispatch) => {
		dispatch(bookmarkIsLoading(true));
		axios.get('/api/bookmarks', { params: { targetUrl } })
			.then((response) => response.data)
			.then((status) => {
				let formFields = [];
				let formData = {};

				for (let key in status) {
					if (key === 'url' || key === 'title') {	
						let field = { label: `${capitalizeFirstLetter(key)}`, name: `${key}`, type: 'text' };
						formData[key] = status[key];
						formFields.push(field);
					}
				}

				dispatch(bookmarkStatusSuccess(formData));
				dispatch(bookmarkIsLoading(false));
				return formFields;
			})
			.then((fields) => dispatch(bookmarkFieldsSuccess(fields)))
			.then(() => {
				dispatch(bookmarkShowAdd(false))
				dispatch(bookmarkShowPreview(true))
			})
			.catch(() => dispatch(bookmarkHasErrored(true))
		)
	}
);

export const editBookmarkForm = () => ((dispatch) => {
		dispatch(bookmarkShowPreview(false));
		dispatch(bookmarkShowEdit(true));
	}
);

export const previewBookmarkView = () => ((dispatch) => {
		dispatch(bookmarkShowPreview(true));
		dispatch(bookmarkShowEdit(false));
		dispatch(bookmarkIsLoading(false));
	}
);

export const updateBookmarkInfo = (info) => ((dispatch) => {
		dispatch(bookmarkStatusSuccess(info));
	}
);

export const closeBookmark = () => ((dispatch) => {
		dispatch(bookmarkShowAdd(true));
		dispatch(bookmarkShowPreview(false));
		dispatch(bookmarkShowEdit(false));
		dispatch(bookmarkStatusSuccess(null));
	}
);

export const saveBookmark = (data) => ((dispatch) => {
		dispatch(BookmarkSave(data));
		dispatch(bookmarkShowAdd(true));
		dispatch(bookmarkShowPreview(false));
		dispatch(bookmarkShowEdit(false));
		dispatch(bookmarkStatusSuccess(null));
	}
);