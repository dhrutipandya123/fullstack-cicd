
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fullstackdb'
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Error:', err.message))

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: { type: String, required: true }
  })
)

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js Backend' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create({ name: req.body.name })
    res.status(201).json({ message: 'User saved', user })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    res.json(await User.find())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`)
})
