const express = require('express')
const router = express.Router()

const taskController = require('../controllers/tasksController.js')

// CRUD routes
router.post('/', taskController.createTask)
router.get('/', taskController.readAllTasks)

module.exports = router
