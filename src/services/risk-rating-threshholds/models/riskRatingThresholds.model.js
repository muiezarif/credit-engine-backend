const mongoose = require('mongoose');

const riskRatingThresholdsSchema = new mongoose.Schema({
    ratingRanges: [{
        rating: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D', 'E']
        },
        minScore: {
            type: Number,
            required: true
        },
        maxScore: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('RiskRatingThresholds', riskRatingThresholdsSchema);