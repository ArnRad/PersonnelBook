const mongoose = require('mongoose');

const workplaceSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    number: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    city: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    country: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Workplace', workplaceSchema);