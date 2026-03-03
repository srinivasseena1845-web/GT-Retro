const express = require('express');
const orderRouter = express.Router();
const { createOrder, getOrders } = require('../controllers/OrderController');
const validateOrder = require('../middleware/validateOrder');
const { getOrderById, updateOrderStatus } = require('../controllers/OrderController');

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.patch('/:id/status', updateOrderStatus);  

module.exports = orderRouter;    