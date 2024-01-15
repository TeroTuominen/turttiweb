const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const tokenAuth = req.headers.authorization;

    try {
        if (tokenAuth) {
            const token = tokenAuth.split(' ')[1];
            if (token) {
                const userData = jwt.verify(token, 'app');
                req.userId = userData.userId;
            }
        }
    } catch (e) {
        req.userId = null;
        console.error('Error in Auth middleware:', e);
    }

    next(); // Move next() outside of the try-catch block
};
