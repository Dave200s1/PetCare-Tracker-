const AppDataSource = require('../data-source')
const Task = require('../models/Task')
const { ObjectId } = require('mongodb')

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
//Read
exports.readAllTasks = async (req, res) => {
  try {
    const tasks = await taskRepo.find()
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//Update
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id

    const task = await taskRepo.findOneBy({
      _id: new ObjectId(id),
    })

    if (!task) {
      return res.status(404).json({ message: 'Task nicht gefunden' })
    }

    Object.assign(task, req.body)

    const updated = await taskRepo.save(task)

    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

//Delete
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;


    const task = await taskRepo.findOne({
      where: { _id: new ObjectId(id) }
    });

    if (!task) {
      return res.status(404).json({ message: 'Task nicht gefunden' });
    }

    // Task mit remove() löschen (statt delete)
    await taskRepo.remove(task);

    res.json({ message: 'Task wurde erfolgreich entfernt' });
  } catch (err) {
    console.error('Fehler beim Löschen:', err);
    res.status(500).json({ error: err.message });
  }
};
