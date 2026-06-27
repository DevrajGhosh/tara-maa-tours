const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const cloudinary = require('cloudinary').v2
const multer = require('multer')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const upload = multer({ storage: multer.memoryStorage() })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Admin auth
const adminAuth = (req, res, next) => {
  const password = req.headers['x-admin-password']
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// GET all tours (public)
router.get('/', async (req, res) => {
  try {
    const { region, featured } = req.query
    let query = 'SELECT * FROM tours WHERE 1=1'
    const params = []

    if (region && region !== 'All') {
      params.push(region)
      query += ` AND region = $${params.length}`
    }
    if (featured === 'true') {
      query += ` AND featured = true`
    }

    query += ' ORDER BY created_at DESC'
    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET single tour (public)
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tours WHERE id = $1', [req.params.id])
    if (result.rows.length === 0) return res.status(404).json({ error: 'Tour not found' })
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST new tour (admin only)
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    let image_url = ''

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tara-maa-tours' },
          (err, result) => err ? reject(err) : resolve(result)
        ).end(req.file.buffer)
      })
      image_url = result.secure_url
    }

    const {
      name, region, duration, duration_days, price,
      featured, short_description, highlights,
      itinerary, inclusions, exclusions
    } = req.body

    const result = await pool.query(
      `INSERT INTO tours
        (name, region, duration, duration_days, price, featured, image_url,
         short_description, highlights, itinerary, inclusions, exclusions)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
       RETURNING *`,
      [
        name, region, duration,
        parseInt(duration_days),
        parseInt(price),
        featured === 'true',
        image_url,
        short_description,
        JSON.parse(highlights),
        JSON.parse(itinerary),
        JSON.parse(inclusions),
        JSON.parse(exclusions),
      ]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update tour (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const {
      name, region, duration, duration_days, price,
      featured, short_description, highlights,
      itinerary, inclusions, exclusions
    } = req.body

    const result = await pool.query(
      `UPDATE tours SET
        name=$1, region=$2, duration=$3, duration_days=$4,
        price=$5, featured=$6, short_description=$7,
        highlights=$8, itinerary=$9, inclusions=$10, exclusions=$11
       WHERE id=$12 RETURNING *`,
      [
        name, region, duration, parseInt(duration_days),
        parseInt(price), featured === 'true', short_description,
        JSON.parse(highlights), JSON.parse(itinerary),
        JSON.parse(inclusions), JSON.parse(exclusions),
        req.params.id
      ]
    )
    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE tour (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await pool.query('DELETE FROM tours WHERE id = $1', [req.params.id])
    res.json({ message: 'Tour deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router