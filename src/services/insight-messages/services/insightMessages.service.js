const InsightMessages = require('../models/insightMessages.model');

class InsightMessagesService {
  async createMessages(messagesData) {
    try {
      const messages = new InsightMessages(messagesData);
      return await messages.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllMessages() {
    return await InsightMessages.find({});
  }

  async getLatestMessages() {
    return await InsightMessages.findOne().sort({ createdAt: -1 });
  }

  async getMessagesById(id) {
    const messages = await InsightMessages.findById(id);
    if (!messages) {
      throw new Error('Insight messages not found');
    }
    return messages;
  }

  async updateMessages(id, updateData) {
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

  async deleteMessages(id) {
    const messages = await InsightMessages.findByIdAndDelete(id);
    if (!messages) {
      throw new Error('Insight messages not found');
    }
    return messages;
  }
}

module.exports = new InsightMessagesService();