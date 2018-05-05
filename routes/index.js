const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataControllers.js');

router.get('/api/data', dataController.test);

router.get('/api/projectData', dataController.getProjectData);

router.post('/api/user', dataController.postUser);

module.exports = router;