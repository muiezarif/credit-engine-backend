const express = require('express');
const router = express.Router();
const knockoutRulesController = require('../controllers/knockoutRules.controller');

// Create new knockout rules
router.post('/', knockoutRulesController.createRules.bind(knockoutRulesController));

// Get all knockout rules
router.get('/', knockoutRulesController.getAllRules.bind(knockoutRulesController));

// Get knockout rules by ID
router.get('/:id', knockoutRulesController.getRulesById.bind(knockoutRulesController));

// Update knockout rules
router.put('/:id', knockoutRulesController.updateRules.bind(knockoutRulesController));

// Delete knockout rules
router.delete('/:id', knockoutRulesController.deleteRules.bind(knockoutRulesController));

module.exports = router;