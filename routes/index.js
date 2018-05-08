const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataController.js');

// DUMMY DATA:
router.get('/api/data', dataController.test);

// CREATING, UPDATING OR FETCHING PROJECTS:
router.get('/api/projects', dataController.fetchProjects);
router.get('/api/projectData', dataController.getProjectData);
router.post('/api/newProject', dataController.createNewProject);

// AUTHENTICATION AND USER CREATION:
router.post('/api/user', dataController.postUser);
router.get('/api/current_user', dataController.currentUser);
router.get('/api/login', dataController.login);
router.get('/api/logout', dataController.logout);
router.get('/api/signup', dataController.signup);

module.exports = router;