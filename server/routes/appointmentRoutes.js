const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getAppointments,
    deleteAppointment
} = require('../controllers/appointmentController');

router.post('/book', createAppointment);
router.get('/all', getAppointments); // for admin
router.delete('/:id', deleteAppointment); // ✅ add this for deleting

module.exports = router;
