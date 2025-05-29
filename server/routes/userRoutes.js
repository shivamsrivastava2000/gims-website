const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/save', async (req, res) => {
    const { uid, email, name } = req.body;

    if (!uid || !email) return res.status(400).json({ message: 'Missing data' });

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
