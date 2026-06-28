const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const upload = multer({ storage: multer.memoryStorage() });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Simple admin auth middleware
const adminAuth = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// GET all tours (public)
router.get('/', async (req, res) => {
  const { region, duration, featured } = req.query;
  let query = 'SELECT * FROM tours WHERE 1=1';
  const params = [];

  if (region) { params.push(region); query += ` AND region = $${params.length}`; }
  if (featured === 'true') { query += ` AND featured = true`; }
  query += ' ORDER BY created_at DESC';

  const result = await pool.query(query, params);
  res.json(result.rows);
});

// GET single tour (public)
router.get('/:id', async (req, res) => {
  const result = await pool.query('SELECT * FROM tours WHERE id = $1', [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ error: 'Tour not found' });
  res.json(result.rows[0]);
});

// POST new tour — admin only
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    let image_url = '';

    // Upload image to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tara-maa-tours' },
          (err, result) => err ? reject(err) : resolve(result)
        ).end(req.file.buffer);
      });
      image_url = result.secure_url;
    }

    const {
      name, region, duration, price, featured,
      short_description, highlights, itinerary,
      inclusions, exclusions
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tours 
        (name, region, duration, price, featured, image_url, 
         short_description, highlights, itinerary, inclusions, exclusions)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING *`,
      [
        name, region, duration, price,
        featured === 'true',
        image_url,
        short_description,
        JSON.parse(highlights),       // array
        JSON.parse(itinerary),        // [{day,title,description}]
        JSON.parse(inclusions),       // array
        JSON.parse(exclusions),       // array
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update tour — admin only
router.put('/:id', adminAuth, async (req, res) => {
  const { name, region, duration, price, featured, short_description,
          highlights, itinerary, inclusions, exclusions } = req.body;

  const result = await pool.query(
    `UPDATE tours SET name=$1, region=$2, duration=$3, price=$4,
     featured=$5, short_description=$6, highlights=$7,
     itinerary=$8, inclusions=$9, exclusions=$10
     WHERE id=$11 RETURNING *`,
    [name, region, duration, price, featured, short_description,
     JSON.parse(highlights), JSON.parse(itinerary),
     JSON.parse(inclusions), JSON.parse(exclusions), req.params.id]
  );
  res.json(result.rows[0]);
});

// DELETE tour — admin only
router.delete('/:id', adminAuth, async (req, res) => {
  await pool.query('DELETE FROM tours WHERE id = $1', [req.params.id]);
  res.json({ message: 'Tour deleted' });
});

module.exports = router;