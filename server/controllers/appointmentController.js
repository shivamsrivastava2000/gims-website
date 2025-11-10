const Appointment = require('../models/Appointment');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Set credentials using the refresh token
oAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

// =============================
// ✅ CREATE Appointment & Calendar Event
// =============================
const createAppointment = async (req, res) => {
    try {
        const { name, email, appointmentDate, message } = req.body;

        if (!name || !email || !appointmentDate || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // 1. Save in MongoDB
        const newAppointment = new Appointment({ name, email, appointmentDate, message });
        await newAppointment.save();

        // 2. Create Google Calendar Event
        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

        const event = {
            summary: `Appointment with ${name}`,
            description: message,
            start: {
                dateTime: new Date(appointmentDate).toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: new Date(new Date(appointmentDate).getTime() + 30 * 60000).toISOString(), // 30 mins
                timeZone: 'Asia/Kolkata',
            },
            attendees: [
                { email },
                { email: 'drrahulsinghindia@gmail.com' } // boss email
            ],
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.status(201).json({ success: true, message: 'Appointment booked and added to Google Calendar!' });

    } catch (err) {
        console.error('❌ Error booking appointment:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// =============================
// ✅ GET All Appointments
// =============================
const getAppointments = async (req, res) => {
    try {
        const all = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(all);
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch appointments' });
    }
};

// =============================
// ✅ DELETE Appointment
// =============================
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Appointment deleted' });
    } catch (err) {
        console.error('❌ Error deleting appointment:', err);
        res.status(500).json({ success: false, message: 'Failed to delete appointment' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    deleteAppointment
};
