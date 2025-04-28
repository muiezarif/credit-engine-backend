const express = require('express');
const router = express.Router();
const riskRatingThresholdsController = require('../controllers/riskRatingThresholds.controller');

// Create new thresholds
router.post('/', riskRatingThresholdsController.createThresholds.bind(riskRatingThresholdsController));

// Get all thresholds
router.get('/', riskRatingThresholdsController.getAllThresholds.bind(riskRatingThresholdsController));

// Get thresholds by ID
router.get('/:id', riskRatingThresholdsController.getThresholdsById.bind(riskRatingThresholdsController));

// Update thresholds
router.put('/:id', riskRatingThresholdsController.updateThresholds.bind(riskRatingThresholdsController));

// Delete thresholds
router.delete('/:id', riskRatingThresholdsController.deleteThresholds.bind(riskRatingThresholdsController));

module.exports = router;