const express = require('express')
const cors = require('cors')
require('dotenv').config()

const tourRoutes = require('./routes/tours')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/tours', tourRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Tara Maa Tours Backend Running ✅' })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})