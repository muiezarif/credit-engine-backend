// src/server.js

const mongoose = require('mongoose');
const app = require('./app');

// Set port
const PORT = process.env.PORT || 8800;
const MONGO_URI = "mongodb+srv://muiezarif:wallahi1234@credit-risk-engine.7qk0bvk.mongodb.net/?retryWrites=true&w=majority&appName=credit-risk-engine";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully.');
  
  // Start the server after DB connects
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
