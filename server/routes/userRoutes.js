const express = require('express');
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Save user after login/signup (requires valid Firebase token)
router.post('/save', verifyToken, async (req, res) => {
    const { uid, email, name } = req.body;

    if (!uid || !email) return res.status(400).json({ message: 'Missing data' });

    // Verify that the token UID matches the request UID
    if (req.user.uid !== uid) {
        return res.status(403).json({ message: 'Token UID does not match request UID' });
    }

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            user = await User.create({ uid, email, name });
        }

        res.status(200).json({ message: 'User saved', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
