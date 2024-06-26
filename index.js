const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const StationModel = require('./models/station.js')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.CONNECTION_STRING)

app.get('/api/stations', async (req, res) => {
  const stations = await StationModel.find({})

  try {
    res.send(stations)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/api/stations/:id', async (req, res) => {
  const { id } = req.params
  try {
    const station = await StationModel.findById(id)
    res.send(station)
  } catch (error) {
    res.status(500).send(error)
  }
})

app.listen(3000, () => {
  console.log('Server is running...')
})
