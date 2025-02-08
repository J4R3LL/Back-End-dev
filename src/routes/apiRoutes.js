const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')


//get api by userId
router.get('/:userId', controller.getApiByUserId, controller.sendApi)
//update api by userId
router.put('/', jwtMiddleware.verifyToken, controller.updateApi)


module.exports = router;