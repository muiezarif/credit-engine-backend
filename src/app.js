// src/app.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic Route Loading
const servicesPath = path.join(__dirname, 'services');

fs.readdirSync(servicesPath).forEach(serviceDir => {
  const routesPath = path.join(servicesPath, serviceDir, 'routes');
  
  if (fs.existsSync(routesPath)) {
    fs.readdirSync(routesPath).forEach(file => {
      if (file.endsWith('.routes.js')) {
        const route = require(path.join(routesPath, file));
        app.use(`/api/${serviceDir}`, route);
      }
    });
  }
});

// Global Error Handler (optional - better error responses)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ success: false, message: err.message || 'Internal Server Error' });
});

module.exports = app;
