const express = require('express');
const router = express.Router();
const { GOOGLE_CALLBACK_URL } = require('../config/keys.js');

const {
  fetchProjects,
  getProjectData,
  createNewProject,
  saveProject,
  getBookmarkMetadata,
  deleteProject,
} = require('../controllers/dataController.js');

const {
  postUser,
  logoutUser,
  getUserData,
  googleRedirect,
} = require('../controllers/authController.js');

const passportGoogle = require('../controllers/googleOAuth.js');

// FETCHING, CREATING, UPDATING OR DELETING PROJECT(S):
router.get('/api/projects', fetchProjects);
router.get('/api/projectData', getProjectData);
router.post('/api/newProject', createNewProject);
router.post('/api/updateProject', saveProject);
router.post('/api/deleteProject', deleteProject);

// USER CREATION:
router.post('/api/user', postUser);

// GOOGLE OAuth:
router.get('/api/userData', getUserData);
router.get('/api/logoutUser',logoutUser);
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile', 'email']}));
router.get(
  GOOGLE_CALLBACK_URL,
  passportGoogle.authenticate('google', { failureRedirect: '/' }),
  googleRedirect
);

// GET BOOKMARK INFO
router.get('/api/bookmarks', getBookmarkMetadata);

module.exports = router;