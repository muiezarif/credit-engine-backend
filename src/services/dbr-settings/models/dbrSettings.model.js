const mongoose = require('mongoose');

const dbrSettingsSchema = new mongoose.Schema({
    maximumDBRPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        validate: {
            validator: function(v) {
                return v > 0 && v <= 100;
            },
            message: 'DBR percentage must be between 0 and 100'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DBRSettings', dbrSettingsSchema);