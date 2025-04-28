const loanOfferRangesService = require('../services/loanOfferRanges.service');

class LoanOfferRangesController {
  async createRanges(req, res, next) {
    try {
      const ranges = await loanOfferRangesService.createRanges(req.body);
      res.status(201).json({
        success: true,
        data: ranges
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRanges(req, res, next) {
    try {
      const ranges = await loanOfferRangesService.getAllRanges();
      res.json({
        success: true,
        data: ranges
      });
    } catch (error) {
      next(error);
    }
  }

  async getRangesById(req, res, next) {
    try {
      const ranges = await loanOfferRangesService.getRangesById(req.params.id);
      res.json({
        success: true,
        data: ranges
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRanges(req, res, next) {
    try {
      const ranges = await loanOfferRangesService.updateRanges(
        req.params.id,
        req.body
      );
      res.json({
        success: true,
        data: ranges
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRanges(req, res, next) {
    try {
      await loanOfferRangesService.deleteRanges(req.params.id);
      res.json({
        success: true,
        message: 'Loan offer ranges deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LoanOfferRangesController();