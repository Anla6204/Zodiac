const express = require('express');
const cors = require('cors');
const { processBirthData } = require('./controllers/dataController');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

app.post('/api/birth-data', processBirthData);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
