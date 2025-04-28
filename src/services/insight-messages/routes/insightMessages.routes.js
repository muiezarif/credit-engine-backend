const express = require('express');
const router = express.Router();
const insightMessagesController = require('../controllers/insightMessages.controller');

// Create new messages
router.post('/', insightMessagesController.createMessages.bind(insightMessagesController));

// Get all messages
router.get('/', insightMessagesController.getAllMessages.bind(insightMessagesController));

// Get latest messages
router.get('/latest', insightMessagesController.getLatestMessages.bind(insightMessagesController));

// Get messages by ID
router.get('/:id', insightMessagesController.getMessagesById.bind(insightMessagesController));

// Update messages
router.put('/:id', insightMessagesController.updateMessages.bind(insightMessagesController));

// Delete messages
router.delete('/:id', insightMessagesController.deleteMessages.bind(insightMessagesController));

module.exports = router;