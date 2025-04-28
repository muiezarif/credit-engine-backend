const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    trigger: {
        type: String,
        required: true
    }
});

const insightMessagesSchema = new mongoose.Schema({
    positiveInsights: [messageSchema],
    negativeInsights: [messageSchema],
    alertInsights: [{
        type: {
            type: String,
            required: true,
            enum: ['FRAUD', 'DBR']
        },
        messages: [messageSchema]
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('InsightMessages', insightMessagesSchema);