const mongoose = require('mongoose');

const knockoutRulesSchema = new mongoose.Schema({
    minimumSimahScore: {
        type: Number,
        required: true
    },
    maximumActiveDefaults: {
        type: Number,
        required: true
    },
    minimumAverageBalance: {
        type: Number,
        required: true
    },
    minimumMonthlyIncome: {
        type: Number,
        required: true
    },
    maximumSpendingToIncomeRatio: {
        type: Number,
        required: true
    },
    minimumAge: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('KnockoutRules', knockoutRulesSchema);