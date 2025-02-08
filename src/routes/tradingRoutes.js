const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const currencyController = require('../controllers/currencyController');
const controller = require('../controllers/tradeController');
const apiController = require('../controllers/apiController')
const lootPoolController = require('../controllers/lootPoolController')

//get possessions of trade requester and receiver
router.get('/possessions/:requester_id/:receiver_id', currencyController.getTradeCurrency, apiController.getApiByUserId, lootPoolController.getAllLootMiddleware, inventoryController.getTradeInventory)
//get single trade by trade id
router.get('/:trade_id', controller.getTradeByTradeId,lootPoolController.getAllLootMiddleware, controller.sendTrade)
//user_id1 is trade requester, user_id2 is trade receiver
router.post('/:user_id1/user2/:user_id2', controller.spamHandler, controller.checkOwnership, controller.createPendingTrade)
//trade accepted
router.put('/accept/:trade_id', controller.getTradeByTradeId, inventoryController.updateInventoryOwner, currencyController.tradeCurrency, controller.closeTrade)
//trade rejected
router.delete('/reject/:trade_id', controller.closeTrade)
//trade with other users, inventory_id2 can be 0 to show thats its a gift
router.put('/:user_id1/:inventory_id1/:user_id2/:inventory_id2', inventoryController.tradeInventory)

module.exports = router;