const scoringRulesService = require('../services/scoringRules.service');

class ScoringRulesController {
  async createScoringRules(req, res, next) {
    try {
      const rules = await scoringRulesService.createScoringRules(req.body);
      res.status(201).json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllScoringRules(req, res, next) {
    try {
      const rules = await scoringRulesService.getAllScoringRules();
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async getScoringRulesById(req, res, next) {
    try {
      const rules = await scoringRulesService.getScoringRulesById(req.params.id);
      res.json({
        success: true,
        data: rules
      });
    } catch (error) {
      next(error);
    }
  }

  async updateScoringRules(req, res, next) {
    try {
      const rules = await scoringRulesService.updateScoringRules(
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

  async deleteScoringRules(req, res, next) {
    try {
      await scoringRulesService.deleteScoringRules(req.params.id);
      res.json({
        success: true,
        message: 'Scoring rules deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ScoringRulesController();