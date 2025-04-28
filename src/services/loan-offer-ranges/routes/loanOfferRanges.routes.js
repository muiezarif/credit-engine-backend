const express = require('express');
const router = express.Router();
const loanOfferRangesController = require('../controllers/loanOfferRanges.controller');

// Create new ranges
router.post('/', loanOfferRangesController.createRanges.bind(loanOfferRangesController));

// Get all ranges
router.get('/', loanOfferRangesController.getAllRanges.bind(loanOfferRangesController));

// Get ranges by ID
router.get('/:id', loanOfferRangesController.getRangesById.bind(loanOfferRangesController));

// Update ranges
router.put('/:id', loanOfferRangesController.updateRanges.bind(loanOfferRangesController));

// Delete ranges
router.delete('/:id', loanOfferRangesController.deleteRanges.bind(loanOfferRangesController));

module.exports = router;