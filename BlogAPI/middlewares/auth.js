const jwt = require('jsonwebtoken');
const User = require('../models/User');


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({
            _id: decoded.userId
        })

        if (!user) {
            throw new Error('Unable to login , invalid credentials');
        }

        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        res.status(401).json({
            message: err.message
        });
    }
}

module.exports = auth;