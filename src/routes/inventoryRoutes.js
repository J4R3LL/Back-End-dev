const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventoryController');

//read Inventoryies by user_id
router.get('/:user_id', controller.getInventoryByUserId)
//delete inventory
router.delete('/:inventory_id', controller.deleteSingleInventory)

module.exports = router;