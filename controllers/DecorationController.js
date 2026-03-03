const Decoration = require('../models/Decoration');
const mongoose = require('mongoose');

const createDecoration = async (req, res) => {
    try {
        const decoration = await Decoration.create(req.body);
        res.status(201).json(decoration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDecorations = async (req, res) => {
    const decorations = await Decoration.find();
    res.json(decorations);
};

const getDecorationById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({ message: "Invalid ID" });

    const decoration = await Decoration.findById(req.params.id);
    if (!decoration)
        return res.status(404).json({ message: "Not found" });

    res.json(decoration);
};

module.exports = { createDecoration, getDecorations, getDecorationById };