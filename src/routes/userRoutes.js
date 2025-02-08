const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const bioController = require('../controllers/bioController')
const currencyController = require('../controllers/currencyController')
const inventoryController = require('../controllers/inventoryController')
const lootPoolController = require('../controllers/lootPoolController')
const apiController = require('../controllers/apiController')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const petsController = require('../controllers/petsController');
const tradeController = require('../controllers/tradeController')

//create user and currency in Currency table by user_id, reusing User
router.post('/', controller.createNewUser)
//read all user and information
router.get('/', controller.getAllUser)
//read users with similar or same name
router.get('/username/:username', controller.getUserBySimilarUsername)
//read 12 random user and information
router.get('/random', controller.getRandomUsers, bioController.getRandomBioByUserId, controller.sendRandomUsers)
//read user and information by user_id
router.get('/:user_id', controller.getUserById)
//delete user and currency in Currency table by user_id, reusing User
router.delete('/:user_id', controller.deleteUserById)


router.get('/profile/:userId', controller.getUserByIdMiddleware,bioController.getBioByUserId,
                                currencyController.getCurrencyProfileById, 
                                petsController.getPetsByIdMiddleware,
                                inventoryController.getInventoryProfileByUserId,
                                lootPoolController.getAllLootMiddleware,
                                apiController.getApiByUserId,
                                tradeController.getTradesByReceiverId,
                                controller.sendProfile)

router.put('/profile/:userId', jwtMiddleware.verifyToken, controller.checkUsernameAndEmail, controller.updateUser, apiController.updateApi)


module.exports = router;
