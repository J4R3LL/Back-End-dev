const express = require('express');
const router = express.Router();
const controller = require('../controllers/lootPoolController');

//read all Loot information
router.get('/', controller.getAllLoot)
//read Loot information with loot_id
router.get('/:loot_id', controller.getLootById)
//create single loot
router.post('/', controller.postSingleLoot)
//update loot with loot_id
router.put('/:loot_id', controller.putLoot)
//delete loot
router.delete('/:loot_id', controller.deleteLoot)
//get loot by similar name
router.get('/name/:name', controller.getLootBySimilarName)

module.exports = router;