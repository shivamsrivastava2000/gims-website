const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    createAppointment,
    getAppointments,
    deleteAppointment
} = require('../controllers/appointmentController');

// Public: book an appointment
router.post('/book', createAppointment);

// Admin only: get all appointments
router.get('/all', verifyToken, verifyAdmin, getAppointments);

// Admin only: delete an appointment
router.delete('/:id', verifyToken, verifyAdmin, deleteAppointment);

module.exports = router;
