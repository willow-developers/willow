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

// AUTHENTICATION AND USER CREATION:
router.post('/api/user', authController.postUser);
router.get('/api/current_user', authController.currentUser);
router.get('/api/login', authController.login);
router.get('/api/logout', authController.logout);
router.get('/api/signup', authController.signup);

// GOOGLE OAuth:
router.get('/auth/google', passportGoogle.authenticate('google'));

// working test route:
// router.get('/auth/google', authController.test);

router.get(
  GOOGLE_CALLBACK_URL,
  passportGoogle.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    console.log('google authentication successful!!!!');
    res.status(200).send('success');
  }
);

// GET BOOKMARK INFO
router.get('/api/bookmarks', dataController.getBookmarkMetadata);

module.exports = router;