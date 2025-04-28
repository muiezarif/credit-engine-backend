const fraudDetectionService = require('../services/fraudDetection.service');

class FraudDetectionController {
  async createRules(req, res, next) {
    try {
      const rules = await fraudDetectionService.createRules(req.body);
      res.status(201).json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRules(req, res, next) {
    try {
      const rules = await fraudDetectionService.getAllRules();
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestRules(req, res, next) {
    try {
      const rules = await fraudDetectionService.getLatestRules();
      if (!rules) {
        return res.status(404).json({
          success: false,
          message: 'No fraud detection rules found'
        });
      }
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async getRulesById(req, res, next) {
    try {
      const rules = await fraudDetectionService.getRulesById(req.params.id);
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRules(req, res, next) {
    try {
      const rules = await fraudDetectionService.updateRules(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRules(req, res, next) {
    try {
      await fraudDetectionService.deleteRules(req.params.id);
      res.json({
        success: true,
        message: 'Fraud detection rules deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FraudDetectionController();