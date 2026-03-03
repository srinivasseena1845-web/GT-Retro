const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Customer = require('../models/Customer');

const createCustomer = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone, address } = req.body;

        if (!name || !email || !password || !confirmPassword || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Customer already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const newCustomer = await Customer.create({
            name,
            email,
            password,
            phone,
            address
        });

        res.status(201).json({
            message: "Customer created successfully",
            customer: {
                id: newCustomer._id,
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone,
                address: newCustomer.address
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // 🔥 Important: select password
        const existingCustomer = await Customer.findOne({ email }).select("+password");

        if (!existingCustomer) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingCustomer.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 🔐 Generate JWT
        const token = jwt.sign(
            { id: existingCustomer._id, role: "customer" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            customer: {
                id: existingCustomer._id,
                name: existingCustomer.name,
                email: existingCustomer.email,
                phone: existingCustomer.phone,
                address: existingCustomer.address
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().select('-password');
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id).select('-password');
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { name, phone, address } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, phone, address },
            { new: true, runValidators: true }
        ).select('-password');

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCustomer,
    login,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};