const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    trigger: {
        field: { // The user data field to check (e.g., 'simahScore', 'activeLoans', 'age')
            type: String,
            required: true
        },
        operator: { // The comparison operator (e.g., '>', '<', '>=', '<=', '==', '!=')
            type: String,
            required: true,
            enum: ['>', '<', '>=', '<=', '==', '!=', 'exists', 'not_exists'] // Added 'exists', 'not_exists' for checking field presence
        },
        value: { 
            type: mongoose.Schema.Types.Mixed
        }
    }
});

const insightMessagesSchema = new mongoose.Schema({
    positiveInsights: [messageSchema],
    negativeInsights: [messageSchema],
    alertInsights: [messageSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('InsightMessages', insightMessagesSchema);