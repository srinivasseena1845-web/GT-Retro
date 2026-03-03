const mongoose = require('mongoose');

const partyHallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },

    isAvailable: {
        type: Boolean,
        default: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('PartyHall', partyHallSchema);