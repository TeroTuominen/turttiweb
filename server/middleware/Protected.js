const User = require('../models/User');

module.exports = async (req, res, next) => {
    if (!req.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({ error: 'Invalid user ID' });
        }

        next();
    } catch (error) {
        console.error('Error validating user ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
