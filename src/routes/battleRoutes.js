const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');
const controller = require('../controllers/battleController');

//battle other users
router.get('/:user_id1/:user_id2', currencyController.petBattle, controller.createSingleBattle) // let user_id1 be attacker and user_id2 be defender


module.exports = router;