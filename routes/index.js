const express = require('express');
const router = express.Router();
const { GOOGLE_CALLBACK_URL } = require('../config/keys.js');

const dataController = require('../controllers/dataController.js');
const authController = require('../controllers/authController.js');
const passportGoogle = require('../controllers/googleOAuth.js');

// DUMMY DATA:
router.get('/api/data', dataController.test);

// FETCHING, CREATING, UPDATING OR DELETING PROJECT(S):
router.get('/api/projects', dataController.fetchProjects);
router.get('/api/projectData', dataController.getProjectData);
router.post('/api/newProject', dataController.createNewProject);
router.post('/api/updateProject', dataController.saveProject);

// USER CREATION:
router.post('/api/user', authController.postUser);

// OLD AUTHENTICATION ROUTES:
// router.get('/api/current_user', authController.currentUser);
// router.get('/api/login', authController.login);
// router.get('/api/logout', authController.logout);
// router.get('/api/signup', authController.signup);

// GOOGLE OAuth:
router.get('/api/userData', authController.getUserData);
router.get('/api/logoutUser',authController.logoutUser);
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile', 'email']}));
router.get(
  GOOGLE_CALLBACK_URL,
  passportGoogle.authenticate('google', { failureRedirect: '/' }),
  authController.googleRedirect
);

// GET BOOKMARK INFO
router.get('/api/bookmarks', dataController.getBookmarkMetadata);

module.exports = router;