const mongoose = require('mongoose');

const rangeSchema = new mongoose.Schema({
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

const scoringRulesSchema = new mongoose.Schema({
    simahScore: [rangeSchema],
    activeLoans: [{
        count: {
            type: Number,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }],
    defaults: [{
        count: {
            type: Number,
            required: true
        },
        points: {
            type: Number,
            required: true
        }
    }],
    avgBankBalance: [rangeSchema],
    estimatedMonthlyIncome: [rangeSchema],
    spendingToIncomeRatio: [rangeSchema],

}, {
    timestamps: true
});

module.exports = mongoose.model('ScoringRules', scoringRulesSchema);