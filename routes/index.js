const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController.js');

// DUMMY DATA:
router.get('/api/data', dataController.test);

// FETCHING, CREATING, UPDATING OR DELETING PROJECT(S):
router.get('/api/projects', dataController.fetchProjects);
router.get('/api/projectData', dataController.getProjectData);
router.post('/api/newProject', dataController.createNewProject);
router.post('/api/updateProject', dataController.saveProject);

// AUTHENTICATION AND USER CREATION:
router.post('/api/user', dataController.postUser);
router.get('/api/current_user', dataController.currentUser);
router.get('/api/login', dataController.login);
router.get('/api/logout', dataController.logout);
router.get('/api/signup', dataController.signup);
router.get('/api/bookmarks', dataController.getBookmarkMetadata);

module.exports = router;