const insightMessagesService = require('../services/insightMessages.service');

class InsightMessagesController {
  async createInsightMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.createInsightMessages(req.body);
      res.status(201).json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllInsightMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.getAllInsightMessages();
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestInsightMessages(req, res, next) {
    try {
      const messages = await insightMessagesService.getLatestInsightMessages();
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

  async getInsightMessagesById(req, res, next) {
    try {
      const messages = await insightMessagesService.getInsightMessagesById(req.params.id);
      res.json({
        success: true,
        data: messages
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInsightMessages(req, res, next) {
    try {
      console.log(req.body.positiveInsights[0].triggerDetails)
      const messages = await insightMessagesService.updateInsightMessages(
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

  async deleteInsightMessages(req, res, next) {
    try {
      await insightMessagesService.deleteInsightMessages(req.params.id);
      res.json({
        success: true,
        message: 'Insight messages deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async evaluateUserInsights(req, res, next) {
    try {
      const { userData } = req.body;
      const messages = await insightMessagesService.getLatestInsightMessages();
      
      if (!messages) {
        return res.status(404).json({
          success: false,
          message: 'No insight messages configuration found'
        });
      }

      const applicableInsights = insightMessagesService.getApplicableInsights(userData, messages);
      
      res.json({
        success: true,
        data: applicableInsights
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new InsightMessagesController();