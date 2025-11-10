import React from "react";
import Contact from "../components/contact";
import "../styles/ContactPage.css"; // optional if you want unique styling

export default function ContactPage() {
    return (
        <div className="contact-page">
            <h1 className="contact-page-heading">Contact Us</h1>
            <p className="contact-page-subtext">
                We'd love to hear from you! Whether you’re a startup, mentor, investor, or just curious — reach out to us.
            </p>
            <Contact />
        </div>
    );
}
