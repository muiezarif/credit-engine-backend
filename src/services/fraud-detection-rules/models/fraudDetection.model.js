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

module.exports = mongoose.model('FraudDetectionRules', fraudDetectionSchema);