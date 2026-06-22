const express = require('express')
const router = express.Router()

const petController = require('../controllers/petsController.js')

//CRUD routes
router.post('/', petController.createPet)
router.get('/', petController.readAllPets)
router.get('/:id', petController.readSpecificPet)
router.put('/:id', petController.updatePet)
router.delete('/delete/:id', petController.deletePet)
module.exports = router
