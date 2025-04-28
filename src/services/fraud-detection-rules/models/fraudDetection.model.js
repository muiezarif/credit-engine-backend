const mongoose = require('mongoose');

const fraudDetectionSchema = new mongoose.Schema({
    maxUnrelatedIncomingTransactions: {
        type: Number,
        required: true,
        min: 0
    },
    maxSuddenDepositMultiple: {
        type: Number,
        required: true,
        min: 0
    },
    minimumAccountAge: {
        type: Number,
        required: true,
        min: 0
    },
    maxAllowedNoExpensePeriod: {
        type: Number,
        required: true,
        min: 0
    },
    highBalanceWithoutActivityThreshold: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});

// Validate thresholds are positive numbers
fraudDetectionSchema.pre('save', function(next) {
    if (this.maxUnrelatedIncomingTransactions < 0 ||
        this.maxSuddenDepositMultiple < 0 ||
        this.minimumAccountAge < 0 ||
        this.maxAllowedNoExpensePeriod < 0 ||
        this.highBalanceWithoutActivityThreshold < 0) {
        next(new Error('All thresholds must be positive numbers'));
        return;
    }
    next();
});

module.exports = mongoose.model('FraudDetectionRules', fraudDetectionSchema);