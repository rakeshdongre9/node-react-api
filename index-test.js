require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');

connectDB();

const PORT = 7070;


// Middleware
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Require user routes
const userRoutes = require('./routes/userRoutes');

// Use user routes
app.use('/auth', userRoutes); // Prefix routes with '/auth'


// Routes
app.get('/rakesh', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});