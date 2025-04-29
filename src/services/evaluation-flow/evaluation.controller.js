const User = require('../user/models/user.model');
const KnockoutRules = require('../knock-out-rules/models/knockoutRules.model');
const ScoringRules = require('../scoring-rules/models/scoringRules.model');
const RiskRatingThresholds = require('../risk-rating-threshholds/models/riskRatingThresholds.model');
const LoanOfferRanges = require('../loan-offer-ranges/models/loadOfferRanges.model');
const DBRSettings = require('../dbr-settings/models/dbrSettings.model');
const FraudDetectionRules = require('../fraud-detection-rules/models/fraudDetection.model');
const InsightMessages = require('../insight-messages/models/insightMessages.model');

class EvaluationController {
    async evaluateUser(req, res) {
        try {
            const { nationalId } = req.params;

            // Get user data
            const user = await User.findOne({ nationalId });
            if (!user) {
                return res.status(200).json({
                    success: false,
                    message: 'User not found',
                    result: {}
                });
            }

            // 1. Knockout Rules Check
            const knockoutRules = await KnockoutRules.findOne().sort({ createdAt: -1 });
            // 2. Calculate Scoring Rules
            const scoringRules = await ScoringRules.findOne().sort({ createdAt: -1 });
            // 3. Determine Risk Rating
            const riskRatingThresholds = await RiskRatingThresholds.findOne().sort({ createdAt: -1 });
            // 4. Get Loan Offer
            const loanOfferRanges = await LoanOfferRanges.findOne().sort({ createdAt: -1 });
            // 5. Check DBR
            const dbrSettings = await DBRSettings.findOne().sort({ createdAt: -1 });
            // 6. Fraud Detection
            const fraudRules = await FraudDetectionRules.findOne().sort({ createdAt: -1 });
            // 7. Insights
            const insightMessages = await InsightMessages.findOne().sort({ createdAt: -1 });

            const knockoutResult = this.checkKnockoutRules(user, knockoutRules);
            if (knockoutResult.details.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: 'User is not eligible for loan',
                    result: {
                        knockoutResult,
                        scoreResult: {},
                        riskRating: '',
                        loanOffer: {},
                        dbrCheckResult: {},
                        fraudResult: {},
                        insightsResult: {}
                    }
                });
            }

            const scoreResult = this.calculateScore(user, scoringRules);

            const riskRating = this.determineRiskRating(scoreResult.rawScore, riskRatingThresholds);

            const loanOffer = this.determineLoanOffer(riskRating, loanOfferRanges);

            const dbrResult = this.checkDBR(user, dbrSettings, loanOffer);
            
            const fraudResult = this.checkFraudDetection(user, fraudRules);

            const insightsResult = this.getApplicableInsights(user, insightMessages);
            

            // Final Response
            return res.status(200).json({
                success: true,
                message: 'User is eligible for loan',
                result: {
                    knockoutResult:{details:[]},
                    scoreResult,
                    riskRating,
                    loanOffer,
                    dbrResult,
                    fraudResult,
                    insightsResult
                }
            });

        } catch (error) {
            console.error('Evaluation error:', error);
            return res.status(500).json({
                success: false,
                message: 'Error during evaluation process'
            });
        }
    }

    checkKnockoutRules(user, rules) {
        const details = [];

        if (user.simahScore < rules.minimumSimahScore) {
            details.push('SIMAH score below minimum threshold');
        }
        if (user.defaults > rules.maximumActiveDefaults) {
            details.push('Too many active defaults');
        }
        if (user.avgBankBalance < rules.minimumAverageBalance) {
            details.push('Average balance below minimum');
        }
        if (user.estimatedIncome < rules.minimumMonthlyIncome) {
            details.push('Monthly income below minimum');
        }
        if (user.spendingRatio > rules.maximumSpendingToIncomeRatio) {
            details.push('Spending ratio too high');
        }
        if (user.age < rules.minimumAge) {
            details.push('Age below minimum requirement');
        }

        return {
            details
        };
    }

    calculateScore(user, rules) {
        let rawScore = 0;

        // SIMAH Score Points
        const simahRange = rules.simahScore.find(range =>
            user.simahScore >= range.min && user.simahScore <= range.max
        );
        if (simahRange) {
            rawScore += simahRange.points;
        }

        // Active Loans Points
        const loansRule = rules.activeLoans.find(rule => user.activeLoans === rule.count);
        if (loansRule) {
            rawScore += loansRule.points;
        }

        // Active Defaults Points
        const defaultsRule = rules.defaults.find(rule => user.defaults === rule.count);
        if (defaultsRule) {
            rawScore += defaultsRule.points;
        }

        // Average Balance Points
        const balanceRule = rules.avgBankBalance.find(rule =>
            user.avgBankBalance >= rule.min && user.avgBankBalance <= rule.max
        );
        if (balanceRule) {
            rawScore += balanceRule.points;
        }

        // Estimated Income Points
        const incomeRule = rules.estimatedMonthlyIncome.find(rule =>
            user.estimatedIncome >= rule.min && user.estimatedIncome <= rule.max
        );
        if (incomeRule) {
            rawScore += incomeRule.points;
        }

        // Spending Ratio Points
        const spendingRatioRule = rules.spendingToIncomeRatio.find(rule =>
            user.spendingRatio === rule.count
        );
        if (spendingRatioRule) {
            rawScore += spendingRatioRule.points;
        }
        const normalizedScore = (rawScore / 120) * 100;

        return {
            rawScore,
            normalizedScore
        };
    }

    determineRiskRating(normalizedScore, thresholds) {
        const ratingRange = thresholds.ratingRanges.find(range =>
            normalizedScore >= range.minScore && normalizedScore <= range.maxScore
        );
        return ratingRange ? ratingRange.rating : 'E';
    }

    determineLoanOffer(riskRating, loanOfferRanges) {
        const ratingRange = loanOfferRanges.ratingRanges.find(range =>
            range.rating === riskRating
        );
        return ratingRange ? {
            minimum: ratingRange.minimumAmount,
            maximum: ratingRange.maximumAmount
        } : null;
    }

    checkDBR(user, dbrSettings, loanOffer) {
        console.log(user.dbrObligations, dbrSettings.maximumDBRPercentage)
        return {
            passed: user.dbrObligations <= dbrSettings.maximumDBRPercentage,
            details: {
                calculatedDBR: user.dbrObligations,
                threshold: dbrSettings.maximumDBRPercentage,
                alerts: user.dbrObligations > dbrSettings.maximumDBRPercentage ?
                    [`DBR (${user.dbrObligations}%) exceeds maximum allowed (${dbrSettings.maximumDBRObligations}%)`] : []
            },
        }
    }

    checkFraudDetection(user, rules) {
        const alerts = [];

        // Implement fraud detection logic based on rules
        // Example:
        if (user.unrelatedTransactions > rules.maxUnrelatedIncomingTransactions) {
            alerts.push('Unusual number of unrelated transactions detected');
        }

        return {
            passed: alerts.length === 0,
            details: alerts,
        };
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

module.exports = new EvaluationController();