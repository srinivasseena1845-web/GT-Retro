const express = require('express');
const decorationRouter = express.Router();
const { createDecoration, getDecorations, getDecorationById } = require('../controllers/DecorationController');

decorationRouter.post('/', createDecoration);
decorationRouter.get('/', getDecorations);
decorationRouter.get('/:id', getDecorationById);

module.exports = decorationRouter;
