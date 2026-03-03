const mongoose = require('mongoose');

const validateOrder = (req, res, next) => {
    const { user, items, total, status } = req.body;
    
    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: 'Valid user ID is required' });
    }
    
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Items array is required and cannot be empty' });
    }
    
    for (const item of items) {
        if (!item.menu || !mongoose.Types.ObjectId.isValid(item.menu)) {
            return res.status(400).json({ message: 'Valid menu ID is required for each item' });
        }
        
        if (!item.quantity || item.quantity < 1 || !Number.isInteger(item.quantity)) {
            return res.status(400).json({ message: 'Quantity must be a positive integer' });
        }
    }
    
    if (total === undefined || total < 0 || !Number.isFinite(total)) {
        return res.status(400).json({ message: 'Valid total amount is required' });
    }
    
    if (status && !['pending','confirmed','preparing','ready','delivered','cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }
    
    next();
};

module.exports = validateOrder;
