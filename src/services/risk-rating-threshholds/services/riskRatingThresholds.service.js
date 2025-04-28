const RiskRatingThresholds = require('../models/riskRatingThresholds.model');

class RiskRatingThresholdsService {
  async createThresholds(thresholdsData) {
    try {
      const thresholds = new RiskRatingThresholds(thresholdsData);
      return await thresholds.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllThresholds() {
    return await RiskRatingThresholds.find({});
  }

  async getThresholdsById(id) {
    const thresholds = await RiskRatingThresholds.findById(id);
    if (!thresholds) {
      throw new Error('Risk rating thresholds not found');
    }
    return thresholds;
  }

  async updateThresholds(id, updateData) {
    const thresholds = await RiskRatingThresholds.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!thresholds) {
      throw new Error('Risk rating thresholds not found');
    }
    return thresholds;
  }

  async deleteThresholds(id) {
    const thresholds = await RiskRatingThresholds.findByIdAndDelete(id);
    if (!thresholds) {
      throw new Error('Risk rating thresholds not found');
    }
    return thresholds;
  }
}

module.exports = new RiskRatingThresholdsService();