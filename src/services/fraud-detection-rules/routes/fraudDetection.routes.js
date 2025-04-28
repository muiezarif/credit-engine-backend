const express = require('express');
const router = express.Router();
const fraudDetectionController = require('../controllers/fraudDetection.controller');

// Create new rules
router.post('/', fraudDetectionController.createRules.bind(fraudDetectionController));

// Get all rules
router.get('/', fraudDetectionController.getAllRules.bind(fraudDetectionController));

// Get latest rules
router.get('/latest', fraudDetectionController.getLatestRules.bind(fraudDetectionController));

// Get rules by ID
router.get('/:id', fraudDetectionController.getRulesById.bind(fraudDetectionController));

// Update rules
router.put('/:id', fraudDetectionController.updateRules.bind(fraudDetectionController));

// Delete rules
router.delete('/:id', fraudDetectionController.deleteRules.bind(fraudDetectionController));

module.exports = router;