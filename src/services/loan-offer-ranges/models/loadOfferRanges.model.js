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


module.exports = mongoose.model('LoanOfferRanges', loanOfferRangesSchema);