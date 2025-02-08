const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskProgressController');
const inventoryController = require('../controllers/inventoryController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

//create quest progress, reusing taskProgress
router.post('/quest', controller.createTaskProgress, inventoryController.createInventory)

router.post('/claimQuest', jwtMiddleware.verifyToken, controller.verifyCompletion ,controller.claimQuest, inventoryController.createInventory)

//create task progress
router.post('/', controller.createTaskProgress)
//read task progress and information by progress_id
router.get('/:progress_id', controller.getTaskProgressById)
//update task progress by progress_id
router.put('/:progress_id', controller.putTaskProgress)
//delete task by progress_id
router.delete('/:progress_id', controller.deleteTaskProgress)


module.exports = router;
