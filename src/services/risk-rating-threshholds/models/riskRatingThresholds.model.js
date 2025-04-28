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

// Ensure ranges don't overlap
riskRatingThresholdsSchema.pre('save', function(next) {
    const ranges = this.ratingRanges.sort((a, b) => a.minScore - b.minScore);
    
    for (let i = 0; i < ranges.length - 1; i++) {
        if (ranges[i].maxScore >= ranges[i + 1].minScore) {
            next(new Error('Rating ranges cannot overlap'));
            return;
        }
    }
    next();
});

module.exports = mongoose.model('RiskRatingThresholds', riskRatingThresholdsSchema);