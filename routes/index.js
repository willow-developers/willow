const express = require('express');
const router = express.Router();

const dataController = require('../controllers/dataControllers.js');

router.get('/api/data', dataController.test);

module.exports = router;