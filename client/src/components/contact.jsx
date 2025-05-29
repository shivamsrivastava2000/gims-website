import '../styles/Contact.css';
import { useState } from 'react';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        message: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', form);
        // TODO: Connect to backend
    };

    return (
        <section className="contact-section">
            <h2 className="contact-heading">Book an Appointment</h2>

            <div className="contact-grid">
                {/* ✅ Left: Google Map */}
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

                {/* ✅ Right: Form + Contact Info */}
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

                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
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
