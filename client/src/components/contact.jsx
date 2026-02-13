import '../styles/Contact.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [appointmentDate, setAppointmentDate] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ---------- Premium toast helpers ----------
    const makeBody = (title, detail = '') => (
        <div className="toast-content">
            <div className="toast-title">{title}</div>
            {detail ? <div className="toast-detail">{detail}</div> : null}
        </div>
    );

    const icons = {
        success: '✓',
        error: '⨯',
        info: 'ℹ︎',
        warning: '⚠︎',
        loading: '⏳',
    };

    const showLoadingToast = (title = 'Booking your appointment...') =>
        toast.loading(makeBody(title), {
            icon: icons.loading,
            className: 'toast-modern toast-loading',
            progressClassName: 'toast-progress',
            closeButton: true,
        });

    const updateToast = (id, type, title, detail = '') =>
        toast.update(id, {
            render: makeBody(title, detail),
            type,
            isLoading: false,
            autoClose: 3000,
            icon: icons[type] ?? undefined,
            className: `toast-modern toast-${type}`,
            progressClassName: 'toast-progress',
            closeButton: true,
        });
    // ------------------------------------------

    // Working hours: 9 AM to 5 PM
    const minTime = new Date();
    minTime.setHours(9, 0, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(17, 0, 0, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !appointmentDate || !form.message) {
            toast.error(makeBody('Please fill in all fields', 'Make sure to select a date & time.'), {
                icon: icons.error,
                className: 'toast-modern toast-error',
                progressClassName: 'toast-progress',
                closeButton: true,
                autoClose: 3000,
            });
            return;
        }

        // Prevent past dates (extra safety beyond DatePicker minDate)
        if (appointmentDate < new Date()) {
            toast.error(makeBody('Invalid date', 'Please select a future date and time.'), {
                icon: icons.error,
                className: 'toast-modern toast-error',
                progressClassName: 'toast-progress',
                closeButton: true,
                autoClose: 3000,
            });
            return;
        }

        const bookingData = {
            ...form,
            appointmentDate: appointmentDate.toISOString(),
        };

        const toastId = showLoadingToast();

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingData),
            });

            let data = {};
            try {
                data = await res.json();
            } catch (_) {
                /* ignore parse error; handled below */
            }

            if (res.ok && data?.success) {
                updateToast(toastId, 'success', 'Appointment booked');
                setForm({ name: '', email: '', message: '' });
                setAppointmentDate(null);
            } else {
                const msg = data?.message || 'Booking failed';
                updateToast(toastId, 'error', msg, 'Please try again.');
            }
        } catch (error) {
            console.error('Appointment error:', error);
            updateToast(toastId, 'error', 'Server error', 'Please try again.');
        }
    };

    return (
        <section className="contact-section">
            <h2 className="contact-heading">Book an Appointment</h2>

            <div className="contact-grid">
                {/* Left: Google Map */}
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4644.106447968175!2d77.52973669038884!3d28.43420912083827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc05b6a0c8273%3A0xcff4548bd51c4894!2sGovernment%20Institute%20of%20Medical%20Sciences%E2%80%8B!5e0!3m2!1sen!2sin!4v1746092025926!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="GIMS Map"
                    ></iframe>
                </div>

                {/* Right: Form + Contact Info */}
                <div className="contact-left">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="input-row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <DatePicker
                            selected={appointmentDate}
                            onChange={(date) => setAppointmentDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select Date & Time"
                            className="appointment-datepicker"
                            minDate={new Date()}
                            minTime={minTime}
                            maxTime={maxTime}
                            filterDate={(date) => {
                                // Disable weekends (Sunday = 0)
                                const day = date.getDay();
                                return day !== 0;
                            }}
                        />

                        <textarea
                            name="message"
                            rows="4"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit" className="contact-button">
                            Send Message
                        </button>
                    </form>

                    <div className="contact-info">
                        <p><strong>Email:</strong> gims.incubator@bio.com</p>
                        <p><strong>Phone:</strong> +91-9876543210</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
