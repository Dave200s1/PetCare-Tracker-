require('reflect-metadata')
require('dotenv').config({ path: '../.env' })
const { DataSource } = require('typeorm')

const Pet = require('./models/Pet')
const Task = require('./models/Task')

const AppDataSource = new DataSource({
  type: 'mongodb',

  url: process.env.MONGO_URI,

  database: 'petcare',

  synchronize: true,
  useUnifiedTopology: true,

  logging: false,

  entities: [Pet, Task],
})

module.exports = AppDataSource
