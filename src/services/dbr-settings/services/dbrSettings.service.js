const DBRSettings = require('../models/dbrSettings.model');

class DBRSettingsService {
  async createSettings(settingsData) {
    try {
      const settings = new DBRSettings(settingsData);
      return await settings.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllSettings() {
    return await DBRSettings.find({});
  }


  async updateSettings(id, updateData) {
    const settings = await DBRSettings.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!settings) {
      throw new Error('DBR settings not found');
    }
    return settings;
  }

  async deleteSettings(id) {
    const settings = await DBRSettings.findByIdAndDelete(id);
    if (!settings) {
      throw new Error('DBR settings not found');
    }
    return settings;
  }
}

module.exports = new DBRSettingsService();