const InsightMessages = require('../models/insightMessages.model');

class InsightMessagesService {
  async createInsightMessages(messagesData) {
    try {
      const messages = new InsightMessages(messagesData);
      return await messages.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllInsightMessages() {
    return await InsightMessages.find({});
  }

  async getLatestInsightMessages() {
    return await InsightMessages.findOne().sort({ createdAt: -1 });
  }

  async getInsightMessagesById(id) {
    const messages = await InsightMessages.findById(id);
    if (!messages) {
      throw new Error('Insight messages not found');
    }
    return messages;
  }

  async updateInsightMessages(id, updateData) {
    const messages = await InsightMessages.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!messages) {
      throw new Error('Insight messages not found');
    }
    return messages;
  }

  async deleteInsightMessages(id) {
    const messages = await InsightMessages.findByIdAndDelete(id);
    if (!messages) {
      throw new Error('Insight messages not found');
    }
    return messages;
  }

  evaluateTrigger(userData, trigger) {
    const { field, operator, value } = trigger;
    const userValue = userData[field];

    switch (operator) {
      case 'exists':
        return userValue !== undefined;
      case 'not_exists':
        return userValue === undefined;
      case '>':
        return userValue > value;
      case '<':
        return userValue < value;
      case '>=':
        return userValue >= value;
      case '<=':
        return userValue <= value;
      case '==':
        return userValue == value;
      case '!=':
        return userValue != value;
      default:
        return false;
    }
  }

  getApplicableInsights(userData, messages) {
    const applicable = {
      positiveInsights: [],
      negativeInsights: [],
      alertInsights: []
    };

    messages.positiveInsights.forEach(insight => {
      if (this.evaluateTrigger(userData, insight.trigger)) {
        applicable.positiveInsights.push(insight.message);
      }
    });

    messages.negativeInsights.forEach(insight => {
      if (this.evaluateTrigger(userData, insight.trigger)) {
        applicable.negativeInsights.push(insight.message);
      }
    });

    messages.alertInsights.forEach(insight => {
      if (this.evaluateTrigger(userData, insight.trigger)) {
        applicable.alertInsights.push(insight.message);
      }
    });

    return applicable;
  }
}

module.exports = new InsightMessagesService();