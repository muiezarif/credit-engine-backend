const express = require('express');
const router = express.Router();
const insightMessagesController = require('../controllers/insightMessages.controller');

// Create new messages
router.post('/', insightMessagesController.createInsightMessages.bind(insightMessagesController));

// Get all messages
router.get('/', insightMessagesController.getAllInsightMessages.bind(insightMessagesController));

// Get latest messages
router.get('/latest', insightMessagesController.getLatestInsightMessages.bind(insightMessagesController));

// Evaluate user insights
router.post('/evaluate', insightMessagesController.evaluateUserInsights.bind(insightMessagesController));

// Get messages by ID
router.get('/:id', insightMessagesController.getInsightMessagesById.bind(insightMessagesController));

// Update messages
router.put('/:id', insightMessagesController.updateInsightMessages.bind(insightMessagesController));

// Delete messages
router.delete('/:id', insightMessagesController.deleteInsightMessages.bind(insightMessagesController));

module.exports = router;