import React from "react";
import "../styles/Footer.css";
import logo from '../assets/images/image12.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Logo" className="footer-logo-img" />
                    <span className="footer-logo-text">GIMS CMI</span>
                </div>

                <p className="footer-tagline">Where Innovation Meets Healthcare</p>

                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/apply">Apply</a>
                    <a href="/login">Login</a>
                    <a href="/contact">Contact</a>
                </div>

                <p className="footer-copy">
                    &copy; {new Date().getFullYear()} GIMS CMI. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
