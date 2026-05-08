const AppDataSource = require('../data-source')
const Task = require('../models/Task')

const taskRepo = AppDataSource.getMongoRepository(Task)

//Create
exports.createTask = async (req, res) => {
  try {
    const task = taskRepo.create(req.body)
    const result = await taskRepo.save(task)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.readAllTasks = async (req, res) => {
  try {
    const tasks = await taskRepo.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
