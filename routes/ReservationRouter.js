const express = require('express');
const reservationRouter = express.Router();
const { createReservation, getReservations } = require('../controllers/ReservationController.js');

reservationRouter.post('/', createReservation);
reservationRouter.get('/', getReservations);


module.exports = reservationRouter;