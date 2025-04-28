const express = require('express');
const router = express.Router();
const scoringRulesController = require('../controllers/scoringRules.controller');

// Create new scoring rules
router.post('/', scoringRulesController.createScoringRules.bind(scoringRulesController));

// Get all scoring rules
router.get('/', scoringRulesController.getAllScoringRules.bind(scoringRulesController));

// Get scoring rules by ID
router.get('/:id', scoringRulesController.getScoringRulesById.bind(scoringRulesController));

// Update scoring rules
router.put('/:id', scoringRulesController.updateScoringRules.bind(scoringRulesController));

// Delete scoring rules
router.delete('/:id', scoringRulesController.deleteScoringRules.bind(scoringRulesController));

module.exports = router;