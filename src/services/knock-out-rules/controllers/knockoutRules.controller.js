const knockoutRulesService = require('../services/knockoutRules.service');

class KnockoutRulesController {
  async createRules(req, res, next) {
    try {
      const rules = await knockoutRulesService.createRules(req.body);
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
      const rules = await knockoutRulesService.getAllRules();
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
      const rules = await knockoutRulesService.getRulesById(req.params.id);
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
      const rules = await knockoutRulesService.updateRules(
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
      await knockoutRulesService.deleteRules(req.params.id);
      res.json({
        success: true,
        message: 'Knockout rules deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new KnockoutRulesController();