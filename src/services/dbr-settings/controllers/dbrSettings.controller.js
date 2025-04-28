const dbrSettingsService = require('../services/dbrSettings.service');

class DBRSettingsController {
  async createSettings(req, res, next) {
    try {
      const settings = await dbrSettingsService.createSettings(req.body);
      res.status(201).json({
        success: true,
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllSettings(req, res, next) {
    try {
      const settings = await dbrSettingsService.getAllSettings();
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }

  async getLatestSettings(req, res, next) {
    try {
      const settings = await dbrSettingsService.getLatestSettings();
      if (!settings) {
        return res.status(404).json({
          success: false,
          message: 'No DBR settings found'
        });
      }
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSettings(req, res, next) {
    try {
      const settings = await dbrSettingsService.updateSettings(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: settings
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSettings(req, res, next) {
    try {
      await dbrSettingsService.deleteSettings(req.params.id);
      res.json({
        success: true,
        message: 'DBR settings deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new DBRSettingsController();