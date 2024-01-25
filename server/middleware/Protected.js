const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        if (!req.userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid user ID' });
        }

        req.user = user; // Attach the user object to req.user

        next();
    } catch (error) {
        console.error('Error in Protected middleware:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};