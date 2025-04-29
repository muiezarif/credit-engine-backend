const express = require('express');
const router = express.Router();
const dbrSettingsController = require('../controllers/dbrSettings.controller');

// Create new settings
router.post('/', dbrSettingsController.createSettings.bind(dbrSettingsController));

// Get all settings
router.get('/', dbrSettingsController.getAllSettings.bind(dbrSettingsController));

// Update settings
router.put('/:id', dbrSettingsController.updateSettings.bind(dbrSettingsController));

// Delete settings
router.delete('/:id', dbrSettingsController.deleteSettings.bind(dbrSettingsController));

module.exports = router;