require('dotenv').config({ path: '../.env' })
const express = require('express')
const AppDataSource = require('./data-source')
const taskRoutes = require('./routes/tasks.js')
const cors = require('cors')

const app = express()

const port = process.env.PORT || 80
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hi, du bist im root')
})

app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.use('/api/task', taskRoutes)

AppDataSource.initialize()
  .then(() => {
    console.log('MongoDB-Server verbunden!')

    app.listen(port, (error) => {
      if (!error) {
        console.log('Server läuft auf port ' + port)
      } else {
        console.log('Error, server kann nicht starten', error)
      }
    })
  })
  .catch((err) => {
    console.error('DB Verbindung fehlgeschlagen:', err)
  })
