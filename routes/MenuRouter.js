const express = require('express');
const { createMenu, getMenus, updateMenu, deleteMenu } = require('../controllers/MenuController');

const menuRouter = express.Router();

menuRouter.post('/', createMenu);
menuRouter.get('/', getMenus);
menuRouter.put('/:id', updateMenu);
menuRouter.delete('/:id', deleteMenu);
module.exports = menuRouter;