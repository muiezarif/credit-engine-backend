const FraudDetectionRules = require('../models/fraudDetection.model');

class FraudDetectionService {
  async createRules(rulesData) {
    try {
      const rules = new FraudDetectionRules(rulesData);
      return await rules.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllRules() {
    return await FraudDetectionRules.find({});
  }

  async getLatestRules() {
    return await FraudDetectionRules.findOne().sort({ createdAt: -1 });
  }

  async getRulesById(id) {
    const rules = await FraudDetectionRules.findById(id);
    if (!rules) {
      throw new Error('Fraud detection rules not found');
    }
    return rules;
  }

  async updateRules(id, updateData) {
    const rules = await FraudDetectionRules.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!rules) {
      throw new Error('Fraud detection rules not found');
    }
    return rules;
  }

  async deleteRules(id) {
    const rules = await FraudDetectionRules.findByIdAndDelete(id);
    if (!rules) {
      throw new Error('Fraud detection rules not found');
    }
    return rules;
  }
}

module.exports = new FraudDetectionService();