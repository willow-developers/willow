import { BOOKMARK_HAS_ERRORED, BOOKMARK_IS_LOADING } from '../actions/types';
import { BOOKMARK_SHOW_ADD, BOOKMARK_SHOW_PREVIEW, BOOKMARK_SHOW_EDIT } from '../actions/types';
import { BOOKMARK_STATUS_SUCCESS, BOOKMARK_FIELDS_SUCCESS, LOAD_BOOKMARK_SCRAPE, SAVE_BOOKMARK } from '../actions/types';

export function bookmarkHasErrored(state = false, action) {
	switch (action.type) {
		case BOOKMARK_HAS_ERRORED:
			return action.hasErrored;
		default:
			return state;
	}
}

export function bookmarkIsLoading(state = false, action) {
	switch (action.type) {
		case BOOKMARK_IS_LOADING:
			return action.isLoading;
		default:
			return state;
	}
}

export function bookmarkShowAdd(state = true, action) {
	switch (action.type) {
		case BOOKMARK_SHOW_ADD:
			return action.showAdd;
		default:
			return state;
	}
}

export function bookmarkShowPreview(state = false, action) {
	switch (action.type) {
		case BOOKMARK_SHOW_PREVIEW:
			return action.showPreview;
		default:
			return state;
	}
}

export function bookmarkShowEdit(state = false, action) {
	switch (action.type) {
		case BOOKMARK_SHOW_EDIT:
			return action.showEdit;
		default:
			return state;
	}
}

export function bookmarkFields(state = {}, action) {
	switch (action.type) {
		case BOOKMARK_FIELDS_SUCCESS:
			return action.bookmarkFields;
		default:
			return state;
	}
}

export function bookmarkStatus(state = null, action) {
	switch (action.type) {
		case BOOKMARK_STATUS_SUCCESS:
			return action.bookmarkStatus || false;
		default:
			return state;
	}
}

export function loadBookmarkScrape(state = {}, action) {
	switch (action.type) {
		case LOAD_BOOKMARK_SCRAPE:
			return { data: action.data };
		default:
			return state;
	}
}

export const bookmarkListAdd = (state = [], action) => {
  switch (action.type) {
    case SAVE_BOOKMARK:
      return [...state, action.data];
    default:
      return state;
  }
};
