const LoanOfferRanges = require('../models/loadOfferRanges.model');

class LoanOfferRangesService {
  async createRanges(rangesData) {
    try {
      const ranges = new LoanOfferRanges(rangesData);
      return await ranges.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllRanges() {
    return await LoanOfferRanges.find({});
  }

  async getRangesById(id) {
    const ranges = await LoanOfferRanges.findById(id);
    if (!ranges) {
      throw new Error('Loan offer ranges not found');
    }
    return ranges;
  }

  async updateRanges(id, updateData) {
    const ranges = await LoanOfferRanges.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!ranges) {
      throw new Error('Loan offer ranges not found');
    }
    return ranges;
  }

  async deleteRanges(id) {
    const ranges = await LoanOfferRanges.findByIdAndDelete(id);
    if (!ranges) {
      throw new Error('Loan offer ranges not found');
    }
    return ranges;
  }
}

module.exports = new LoanOfferRangesService();