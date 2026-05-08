const express = require('express')
const router = express.Router()

const taskController = require('../controllers/tasksController.js')

// CRUD routes
router.post('/', taskController.createTask)
router.get('/', taskController.readAllTasks)
router.put('/:id', taskController.updateTask)
router.delete('/delete/:id', taskController.deleteTask)
module.exports = router
