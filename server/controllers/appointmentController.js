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

        // Validate: no past dates
        const requestedDate = new Date(appointmentDate);
        if (requestedDate < new Date()) {
            return res
                .status(400)
                .json({ success: false, message: 'Cannot book appointments in the past' });
        }

        // Validate: working hours only (9 AM - 5 PM IST)
        const hours = requestedDate.getUTCHours() + 5.5; // Convert to IST
        const istHours = hours >= 24 ? hours - 24 : hours;
        if (istHours < 9 || istHours >= 17) {
            return res
                .status(400)
                .json({ success: false, message: 'Appointments are only available between 9 AM and 5 PM IST' });
        }

        // Check for duplicate: same email within +/- 30 minutes of the requested slot
        const slotStart = new Date(requestedDate.getTime() - 30 * 60000);
        const slotEnd = new Date(requestedDate.getTime() + 30 * 60000);

        const existingBooking = await Appointment.findOne({
            email,
            appointmentDate: { $gte: slotStart, $lte: slotEnd }
        });

        if (existingBooking) {
            return res
                .status(409)
                .json({ success: false, message: 'You already have a booking around this time slot' });
        }

        // Save in MongoDB
        const newAppointment = new Appointment({
            name,
            email,
            appointmentDate,
            message
        });
        await newAppointment.save();

        // Create Google Calendar Event (don't crash if it fails)
        let calendarSynced = false;
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
                        { email: 'drrahulsinghindia@gmail.com' }
                    ]
                };

                await calendar.events.insert({
                    calendarId: 'primary',
                    resource: event
                });

                calendarSynced = true;
            } catch (calErr) {
                console.error('⚠️ Google Calendar error:', calErr.message);
            }
        }

        return res.status(201).json({
            success: true,
            message: calendarSynced
                ? 'Appointment booked and added to Google Calendar!'
                : 'Appointment booked successfully.'
        });

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
