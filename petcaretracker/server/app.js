require('dotenv').config({ path: '../.env' })
const express = require('express')

const app = express()

const port = process.env.PORT
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hi, du bist im root')
})

app.listen(port, (error) => {
  if (!error) {
    console.log('Sever laeuft ! auf port ' + port)
  } else {
    console.log('Error, server kann nicht starten', error)
  }
})
