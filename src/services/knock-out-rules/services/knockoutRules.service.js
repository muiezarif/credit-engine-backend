const KnockoutRules = require('../models/knockoutRules.model');

class KnockoutRulesService {
  async createRules(rulesData) {
    try {
      const rules = new KnockoutRules(rulesData);
      return await rules.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllRules() {
    return await KnockoutRules.find({});
  }

  async getRulesById(id) {
    const rules = await KnockoutRules.findById(id);
    if (!rules) {
      throw new Error('Knockout rules not found');
    }
    return rules;
  }

  async updateRules(id, updateData) {
    const rules = await KnockoutRules.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!rules) {
      throw new Error('Knockout rules not found');
    }
    return rules;
  }

  async deleteRules(id) {
    const rules = await KnockoutRules.findByIdAndDelete(id);
    if (!rules) {
      throw new Error('Knockout rules not found');
    }
    return rules;
  }
}

module.exports = new KnockoutRulesService();