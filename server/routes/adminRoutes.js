const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MembershipApplication = require('../models/MembershipApplication');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// GET all users (admin only)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// GET all membership applications (admin only)
router.get('/forms', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const forms = await MembershipApplication.find().sort({ submitted_at: -1 });
        res.json(forms);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching forms' });
    }
});

module.exports = router;
