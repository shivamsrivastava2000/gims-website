const Appointment = require('../models/Appointment');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// =============================
// ✅ Safe OAuth2 Client Init
// =============================
let oAuth2Client = null;

if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REDIRECT_URI &&
    process.env.GOOGLE_REFRESH_TOKEN
) {
    oAuth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    // Set credentials using the refresh token
    oAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });
} else {
    console.warn('⚠️ Google OAuth2 environment variables are missing. Calendar sync will be skipped.');
}

// =============================
// ✅ CREATE Appointment & Calendar Event
// =============================
const createAppointment = async (req, res) => {
    try {
        const { name, email, appointmentDate, message } = req.body;

        if (!name || !email || !appointmentDate || !message) {
            return res
                .status(400)
                .json({ success: false, message: 'All fields are required' });
        }

        // 1. Save in MongoDB (same as before)
        const newAppointment = new Appointment({
            name,
            email,
            appointmentDate,
            message
        });
        await newAppointment.save();

        // 2. Create Google Calendar Event (but don't crash if it fails)
        if (oAuth2Client) {
            try {
                const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

                const startTime = new Date(appointmentDate);
                const endTime = new Date(startTime.getTime() + 30 * 60000); // +30 mins

                const event = {
                    summary: `Appointment with ${name}`,
                    description: message,
                    start: {
                        dateTime: startTime.toISOString(),
                        timeZone: 'Asia/Kolkata'
                    },
                    end: {
                        dateTime: endTime.toISOString(),
                        timeZone: 'Asia/Kolkata'
                    },
                    attendees: [
                        { email },
                        { email: 'drrahulsinghindia@gmail.com' } // boss email (same as before)
                    ]
                };

                await calendar.events.insert({
                    calendarId: 'primary',
                    resource: event
                });

                // If everything goes fine, same success message as before
                return res.status(201).json({
                    success: true,
                    message: 'Appointment booked and added to Google Calendar!'
                });
            } catch (calErr) {
                console.error('⚠️ Google Calendar error:', calErr);
                // Appointment is already saved in DB, so we still send success
                return res.status(201).json({
                    success: true,
                    message: 'Appointment booked, but Calendar sync failed.'
                });
            }
        } else {
            console.warn('⚠️ oAuth2Client not initialized. Skipping Google Calendar event.');
            return res.status(201).json({
                success: true,
                message: 'Appointment booked successfully.'
            });
        }
    } catch (err) {
        console.error('❌ Error booking appointment:', err);
        return res
            .status(500)
            .json({ success: false, message: 'Server error' });
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
        console.error('❌ Error fetching appointments:', err);
        res
            .status(500)
            .json({ success: false, message: 'Failed to fetch appointments' });
    }
};

// =============================
// ✅ DELETE Appointment
// =============================
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ success: true, message: 'Appointment deleted' });
    } catch (err) {
        console.error('❌ Error deleting appointment:', err);
        res
            .status(500)
            .json({ success: false, message: 'Failed to delete appointment' });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    deleteAppointment
};
