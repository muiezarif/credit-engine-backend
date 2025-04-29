// src/services/evaluation-flow/routes/evaluation.routes.js

const express = require('express');
const router = express.Router();
const evaluationController = require('../evaluation.controller');

// Dummy route for testing
router.get('/', (req, res) => {
  res.json({ message: 'Evaluation service working ✅' });
});
// Evaluate user by national ID
router.get('/evaluate/:nationalId', evaluationController.evaluateUser.bind(evaluationController));
module.exports = router;
