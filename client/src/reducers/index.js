import { combineReducers } from 'redux';
import  { reducer as reduxForm } from 'redux-form';
import { userStatus, userHasErrored, userIsLoading } from './authReducer';
import { isModalOpen } from './modalReducer';
import { bookmarkStatus, bookmarkHasErrored, bookmarkIsLoading, bookmarkShowAdd, bookmarkShowPreview, bookmarkShowEdit, bookmarkFields, loadBookmarkScrape } from './bookmarkReducer';
import { createProjectModalToShow, createProjectMilestones, createProjectTitle, createProjectHasErrored, createProjectDataIsLoading } from './createProjectReducer';

// import { loadBookmarkScrape } from './exampleReducer';

export default combineReducers({
	userStatus,
	userHasErrored,
	userIsLoading,
	isModalOpen,
	bookmarkStatus,
	bookmarkHasErrored,
	bookmarkIsLoading,
	bookmarkShowAdd,
	bookmarkShowPreview,
	bookmarkShowEdit,
	bookmarkFields,
	form: reduxForm,
	loadBookmarkScrape,
	createProjectModalToShow,
	createProjectTitle,
	createProjectMilestones,
	createProjectHasErrored, // consider deleting later
	createProjectDataIsLoading, // consider deleting later
});