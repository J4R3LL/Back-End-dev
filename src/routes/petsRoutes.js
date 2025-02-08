const express = require('express');
const router = express.Router();
const controller = require('../controllers/petsController');

//read all pets and information
router.get('/',controller.getAllPets)
//read pet information with pet_id
router.get('/:pet_id', controller.getPetsById)
//create single pet
router.post('/', controller.postSinglePets)
//update pet by pet_id
router.put('/:pet_id', controller.putPets)
//delete pet by pet_id
router.delete('/:pet_id', controller.deletePets)
//get pet by similar name
router.get('/name/:name', controller.getPetsBySimilarName)

module.exports = router;