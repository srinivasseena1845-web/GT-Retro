const jwt = require('jsonwebtoken');

// Role-based access middleware
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Access denied. Authentication required.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: 'Access denied. Insufficient permissions.',
                required: allowedRoles,
                current: req.user.role
            });
        }

        next();
    };
};

// Combined middleware for authentication and role authorization
const authorize = (...allowedRoles) => {
    return [
        (req, res, next) => {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            
            if (!token) {
                return res.status(401).json({ message: 'Access denied. No token provided.' });
            }
            
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            } catch (error) {
                res.status(401).json({ message: 'Invalid token.' });
            }
        },
        authorizeRoles(...allowedRoles)
    ];
};

module.exports = {
    authorizeRoles,
    authorize
};
