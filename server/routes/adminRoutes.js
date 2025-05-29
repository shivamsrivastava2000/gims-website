const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MembershipApplication = require('../models/MembershipApplication');

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// GET all membership applications
router.get('/forms', async (req, res) => {
    try {
        const forms = await MembershipApplication.find().sort({ submitted_at: -1 });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forms' });
    }
});

module.exports = router;
