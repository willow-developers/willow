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
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile', 'email']}));

router.get('/api/userData', (req, res) => {
  console.log('req1!!!', req);
  console.log('req.user!!!', req.user);
  console.log('req.session._passport!!!', req.session._passport);
  res.status(200).send(req.user);
});

// GOOGLE OAuth TESTING ROUTE:
router.get('/api/testing', (req, res) => {
  // session data automatically being stored in req.session.passport.user
  res.status(200).send({req_session: req.session, res_sessionStore: res.req.sessionStore});
});

router.get(
  GOOGLE_CALLBACK_URL,
  passportGoogle.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    console.log(`google authentication successful!!`);
    res.redirect('/dashboard');
  }
);

// GET BOOKMARK INFO
router.get('/api/bookmarks', dataController.getBookmarkMetadata);

module.exports = router;