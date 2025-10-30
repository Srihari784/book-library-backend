require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);

// basic root
app.get('/', (req, res) => res.send('Book Library API is running'));

// connect to DB and start server
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booklibrary';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
