const PartyHall = require('../models/PartyHall');
const mongoose = require('mongoose');

const createPartyHall = async (req, res) => {
    try {
        const hall = await PartyHall.create(req.body);
        res.status(201).json(hall);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPartyHalls = async (req, res) => {
    const halls = await PartyHall.find();
    res.json(halls);
};
const updatePartyHall = async (req, res) => {
    try {
        const { name, pricePerHour } = req.body;
        const hall = await PartyHall.findByIdAndUpdate(req.params.id, { name, pricePerHour }, { new: true });
        res.json(hall);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deletePartyHall = async (req, res) => {
    try {
        const hall = await PartyHall.findByIdAndDelete(req.params.id);
        res.json(hall);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

module.exports = { createPartyHall, getPartyHalls,updatePartyHall,deletePartyHall };