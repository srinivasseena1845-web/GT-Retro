const Reservation = require('../models/Reservation');
const PartyHall = require('../models/PartyHall');
const Decoration = require('../models/Decoration');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');

const createReservation = async (req, res) => {
    try {
        const {
            customer,
            partyHall,
            decoration,
            menuItems,
            eventType,
            bookingDate,
            startTime,
            endTime
        } = req.body;

        if (!customer || !partyHall || !eventType || !bookingDate || !startTime || !endTime) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        if (!mongoose.Types.ObjectId.isValid(partyHall)) {
            return res.status(400).json({ message: "Invalid hall ID" });
        }

        const hall = await PartyHall.findById(partyHall);
        if (!hall) {
            return res.status(400).json({ message: "Hall not found" });
        }

        const existingBooking = await Reservation.findOne({
            partyHall,
            bookingDate,
            status: 'approved'
        });

        if (existingBooking) {
            return res.status(400).json({ message: "Hall already booked for this date" });
        }

        let totalAmount = 0;

        const startHour = parseInt(startTime);
        const endHour = parseInt(endTime);
        const duration = endHour - startHour;

        totalAmount += hall.pricePerHour * duration;

        if (decoration) {
            const decor = await Decoration.findById(decoration);
            if (decor) {
                totalAmount += decor.price;
            }
        }
        if (menuItems && menuItems.length > 0) {
            for (let item of menuItems) {
                const menuItem = await Menu.findById(item.menu);
                if (menuItem) {
                    totalAmount += menuItem.price * item.quantity;
                }
            }
        }

        const reservation = await Reservation.create({
            customer,
            partyHall,
            decoration,
            menuItems,
            eventType,
            bookingDate,
            startTime,
            endTime,
            totalAmount
        });

        res.status(201).json(reservation);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('customer', 'name email')
            .populate('partyHall', 'name pricePerHour')
            .populate('decoration', 'name price')
            .populate('menuItems.menu', 'name price');

        res.status(200).json(reservations);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createReservation,
    getReservations
};