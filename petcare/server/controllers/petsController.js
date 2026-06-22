const AppDataSource = require('../data-source')
const Pet = require('../models/Pet')
const { ObjectId } = require('mongodb')

const petRepo = AppDataSource.getMongoRepository(Pet)

//Create
exports.createPet = async (req, res) => {
  try {
    const Pet = petRepo.create(req.body)
    const result = await petRepo.save(Pet)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
//Read
exports.readAllPets = async (req, res) => {
  try {
    const pets = await petRepo.find()
    res.json(pets)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.readSpecificPet = async (req, res) => {
  try {
    const id = req.params.id
    const pet = await petRepo.findOneBy({
      _id: new ObjectId(id),
    })
    res.json(pet)
    if (!pet) {
      return res.status(404).json({ message: 'Pet nicht gefunden' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updatePet = async (req, res) => {
  try {
    const id = req.params.id
    const updateData = req.body

    const result = await petRepo.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) {
      return res.status(404).json({ message: 'Pet nicht gefunden' })
    }

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deletePet = async (req, res) => {
  try {
    const id = req.params.id
    const pet = await petRepo.findOneBy({
      _id: new ObjectId(id),
    })

    if (!pet) {
      return res.status(404).json({ message: 'Pet bereits geloescht!' })
    }
    await petRepo.delete({
      _id: new ObjectId(id),
    })
    res.json({ message: 'Pet wurde erfolgreich entfernt' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
