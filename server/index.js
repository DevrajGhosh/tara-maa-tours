const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tourRoutes = require('./routes/tours');

const app = express();
app.use(cors({ origin: 'https://your-vercel-app.vercel.app' }));
app.use(express.json());

app.use('/api/tours', tourRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Tara Maa backend running ✅');
});