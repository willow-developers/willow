import { combineReducers } from 'redux';
import  { reducer as reduxForm } from 'redux-form';

import { userStatus, userHasErrored, userIsLoading } from './authReducer';
import { isModalOpen } from './modalReducer';
import { bookmarkStatus, bookmarkHasErrored, bookmarkIsLoading, bookmarkShowAdd, bookmarkShowPreview, bookmarkShowEdit, bookmarkFields, loadBookmarkScrape, bookmarkListAdd } from './bookmarkReducer';
import { createProjectModalToShow, createProjectMilestones, createProjectTitle, createProjectItems, createProjectHasErrored, createProjectDataIsLoading, shouldRedirect, shouldRedirectTo } from './createProjectReducer';

import { projectsList, projectsListHasErrored, projectsListIsLoading } from './projectsReducer';
import { projectData, projectHasErrored, projectIsLoading, clearProjectData } from './projectReducer';
import { newExplorativeNodeCreated } from './explorativeNodeReducer';

import { uiReducer } from './windowSizeReducer';

import { milestones, visibilityFilter, milestoneLoader, visibilityFilterColumn } from './milestoneReducer';

import { notes, noteShowForm, noteShowList, noteEdit } from './notesReducer';

export default combineReducers({
	uiReducer,
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
	bookmarkListAdd,
	createProjectModalToShow,
	createProjectTitle,
	createProjectItems,
	createProjectMilestones,
	createProjectHasErrored,
	createProjectDataIsLoading,
	shouldRedirect,
	shouldRedirectTo,
	projectsList,
	projectsListHasErrored,
	projectsListIsLoading,
	projectData,
	projectHasErrored,
	projectIsLoading,
	clearProjectData,
	newExplorativeNodeCreated,
	milestones,
	visibilityFilter,
	milestoneLoader,
	visibilityFilterColumn,
	notes,
	noteShowForm,
	noteShowList,
	noteEdit,
});