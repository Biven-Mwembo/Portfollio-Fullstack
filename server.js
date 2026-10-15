const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const projectRoutes = require('./server/routes/projectRoutes');
const contactRoutes = require('./server/routes/contactRoutes');
const qualificationRoutes = require('./server/routes/qualificationRoutes');
const userRoutes = require('./server/routes/userRoutes');

// Mount Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/qualifications', qualificationRoutes);
app.use('/api/users', userRoutes);

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Database
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB database connection established successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

// Initial Welcome Route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});