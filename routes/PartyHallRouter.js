const express = require('express');
const partyHallRouter = express.Router();
const { createPartyHall, getPartyHalls,updatePartyHall,deletePartyHall } = require('../controllers/PartyHallController');

partyHallRouter.post('/', createPartyHall);
partyHallRouter.get('/', getPartyHalls);
partyHallRouter.put('/:id', updatePartyHall);
partyHallRouter.delete('/:id', deletePartyHall);

module.exports = partyHallRouter;