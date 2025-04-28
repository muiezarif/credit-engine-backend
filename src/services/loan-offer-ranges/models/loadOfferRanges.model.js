const mongoose = require('mongoose');

const loanOfferRangesSchema = new mongoose.Schema({
    ratingRanges: [{
        rating: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D', 'E']
        },
        minimumAmount: {
            type: Number,
            required: true
        },
        maximumAmount: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

// Validate minimum is less than maximum
loanOfferRangesSchema.pre('save', function(next) {
    const ranges = this.ratingRanges;
    
    for (let range of ranges) {
        if (range.minimumAmount >= range.maximumAmount) {
            next(new Error('Minimum amount must be less than maximum amount'));
            return;
        }
    }
    next();
});

module.exports = mongoose.model('LoanOfferRanges', loanOfferRangesSchema);