const express = require('express');
const router = express.Router();
const controller = require('../controllers/bioController');

router.get('/:userId', controller.getBioByUserId,controller.sendSingleBio)

module.exports = router;