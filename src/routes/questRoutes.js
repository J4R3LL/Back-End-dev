const express = require('express');
const router = express.Router();
const controller = require('../controllers/questController');

//read all quest and information
router.get('/',controller.getAllQuest)
//read quest and information by quest_id
router.get('/:quest_id', controller.getQuestById)
//create quest
router.post('/', controller.postSingleQuest)
//update quest by quest_id
router.put('/:quest_id', controller.putQuest)
//delete quest
router.delete('/:quest_id', controller.deleteQuest)
//get quest by similar title
router.get('/title/:title', controller.getQuestBySimilarTitle)

module.exports = router;