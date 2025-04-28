const riskRatingThresholdsService = require('../services/riskRatingThresholds.service');

class RiskRatingThresholdsController {
  async createThresholds(req, res, next) {
    try {
      const thresholds = await riskRatingThresholdsService.createThresholds(req.body);
      res.status(201).json({
        success: true,
        data: thresholds
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllThresholds(req, res, next) {
    try {
      const thresholds = await riskRatingThresholdsService.getAllThresholds();
      res.json({
        success: true,
        data: thresholds
      });
    } catch (error) {
      next(error);
    }
  }

  async getThresholdsById(req, res, next) {
    try {
      const thresholds = await riskRatingThresholdsService.getThresholdsById(req.params.id);
      res.json({
        success: true,
        data: thresholds
      });
    } catch (error) {
      next(error);
    }
  }

  async updateThresholds(req, res, next) {
    try {
      const thresholds = await riskRatingThresholdsService.updateThresholds(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: thresholds
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteThresholds(req, res, next) {
    try {
      await riskRatingThresholdsService.deleteThresholds(req.params.id);
      res.json({
        success: true,
        message: 'Risk rating thresholds deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RiskRatingThresholdsController();