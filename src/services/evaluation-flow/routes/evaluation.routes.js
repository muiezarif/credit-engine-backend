// src/services/evaluation-flow/routes/evaluation.routes.js

const express = require('express');
const router = express.Router();

// Dummy route for testing
router.get('/', (req, res) => {
  res.json({ message: 'Evaluation service working ✅' });
});

module.exports = router;
