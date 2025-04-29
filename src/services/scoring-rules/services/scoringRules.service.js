const ScoringRules = require('../models/scoringRules.model');

class ScoringRulesService {
  async createScoringRules(rulesData) {
    console.log(rulesData);
    try {
      const rules = new ScoringRules(rulesData);
      return await rules.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllScoringRules() {
    return await ScoringRules.find({});
  }

  async getScoringRulesById(id) {
    const rules = await ScoringRules.findById(id);
    if (!rules) {
      throw new Error('Scoring rules not found');
    }
    return rules;
  }

  async updateScoringRules(id, updateData) {
    const rules = await ScoringRules.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!rules) {
      throw new Error('Scoring rules not found');
    }
    return rules;
  }

  async deleteScoringRules(id) {
    const rules = await ScoringRules.findByIdAndDelete(id);
    if (!rules) {
      throw new Error('Scoring rules not found');
    }
    return rules;
  }
}

module.exports = new ScoringRulesService();