const mongoose = require('mongoose');

const dbrSettingsSchema = new mongoose.Schema({
    maximumDBRPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('DBRSettings', dbrSettingsSchema);