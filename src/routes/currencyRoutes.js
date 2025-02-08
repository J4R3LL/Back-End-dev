const express = require('express');
const router = express.Router();
const controller = require('../controllers/currencyController');
const petsController = require('../controllers/petsController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

//read user by id
router.get('/:user_id', controller.getCurrencyById)
//buy pet for front-end
router.put('/:pet_id', jwtMiddleware.verifyToken, petsController.getPetsByIdMiddleware, controller.putPetWithToken)
//update user's pet
router.put('/:user_id/pet/:pet_id', petsController.getPetsByIdMiddleware, controller.putPet)

module.exports = router;