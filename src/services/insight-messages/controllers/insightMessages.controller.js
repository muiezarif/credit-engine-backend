const insightMessagesService = require('../services/insightMessages.service');

class InsightMessagesController {
  async createMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.createMessages(req.body);
      res.status(201).json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.getAllMessages();
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.getLatestMessages();
      if (!messages) {
        return res.status(404).json({
          success: false,
          message: 'No insight messages found'
        });
      }
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async getMessagesById(req, res, next) {
    try {
      const messages = await insightMessagesService.getMessagesById(req.params.id);
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async updateMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.updateMessages(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMessages(req, res, next) {
    try {
      await insightMessagesService.deleteMessages(req.params.id);
      res.json({
        success: true,
        message: 'Insight messages deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InsightMessagesController();