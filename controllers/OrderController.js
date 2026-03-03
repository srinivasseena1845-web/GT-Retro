const Order = require('../models/Order');
const Menu = require('../models/Menu');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
    try {
        const { customer, items } = req.body;

        if (!customer || !items || items.length === 0) {
            return res.status(400).json({ message: "Customer and items are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(customer)) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }

        let totalAmount = 0;

        for (let item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.menu)) {
                return res.status(400).json({ message: "Invalid menu ID" });
            }

            const menuItem = await Menu.findById(item.menu);

            if (!menuItem) {
                return res.status(400).json({ message: "Menu item not found" });
            }

            totalAmount += menuItem.price * item.quantity;
        }

        const order = await Order.create({
            customer,
            items,
            totalAmount
        });

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('customer', 'name email')
            .populate('items.menu', 'name price')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid Order ID" });
        }

        const order = await Order.findById(req.params.id)
            .populate('customer', 'name email')
            .populate('items.menu', 'name price');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatus = [
            'pending',
            'confirmed',
            'preparing',
            'ready',
            'delivered',
            'cancelled'
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
};