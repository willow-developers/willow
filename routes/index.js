const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataControllers.js');

router.get('/api/data', dataController.test);
router.get('/api/current_user', dataController.currentUser);
router.get('/api/login', dataController.login);
router.get('/api/logout', dataController.logout);

module.exports = router;