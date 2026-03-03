const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },

    partyHall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PartyHall',
        required: true
    },

    decoration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Decoration'
    },

    menuItems: [
        {
            menu: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu'
            },
            quantity: {
                type: Number,
                min: 1
            }
        }
    ],

    eventType: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },

    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending'
    },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'cancelled'],
        default: 'pending'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);