// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

// ✅ Put these images inside: client/src/assets/initiatives/
// Rename them EXACTLY like below (or change import names accordingly)
import nirmanLogo from '../assets/initiatives/nirman.jpg';
import innovativeIdeasLogo from '../assets/initiatives/innovative-ideas.jpg';
import nationalIdeaBankLogo from '../assets/initiatives/national-idea-bank.jpg';
import innovativeIdeasAltLogo from '../assets/initiatives/innovative-ideas-alt.jpg';
import startupTownhallLogo from '../assets/initiatives/startup-townhall.jpg';
import doctorsIdeaLogo from '../assets/initiatives/doctors-idea.jpg';
import indiaDesignLogo from '../assets/initiatives/india-design.jpg';

const About = () => {
    const initiatives = [
        { src: nirmanLogo, title: 'Nirman' },
        { src: innovativeIdeasLogo, title: 'Innovative Ideas of India' },
        { src: nationalIdeaBankLogo, title: 'National Idea Bank' },
        { src: innovativeIdeasAltLogo, title: 'Innovative Ideas of India (Alt)' },
        { src: startupTownhallLogo, title: 'Startup Townhall' },
        { src: doctorsIdeaLogo, title: "Doctors' Idea for India" },
        { src: indiaDesignLogo, title: 'India Design by GIMS' },
    ];

    return (
        <section className="about-section">
            <div className="about-container">

                {/* Left Side */}
                <div className="about-left">
                    <h2 className="about-heading">Empowering Healthcare Innovation</h2>
                    <p className="about-subtitle">
                        GIMS Centre for Medical Innovation (CMI) is India's first public hospital-based medical incubator, nurturing healthcare startups with clinical trials, mentorship, and world-class facilities.
                        Our mission is to bridge clinical excellence and entrepreneurial spirit to create impactful, affordable healthcare solutions for India and beyond.
                    </p>

                    {/* Flowchart Steps */}
                    <div className="about-process">
                        <span className="step">Idea</span>
                        <span className="arrow">→</span>
                        <span className="step">Define</span>
                        <span className="arrow">→</span>
                        <span className="step">Validate</span>
                        <span className="arrow">→</span>
                        <span className="step">Commercialize</span>
                    </div>

                    {/* ✅ NEW: Initiatives / Partners Logos */}
                    <div className="about-initiatives">
                        <h3 className="about-initiatives-heading">Our Indicative / Initiatives & Partners</h3>
                        <div className="about-logos-grid">
                            {initiatives.map((item, idx) => (
                                <div className="about-logo-card" key={idx} title={item.title}>
                                    <img src={item.src} alt={item.title} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Link to="/about" className="learn-more-button">
                        Learn More
                    </Link>
                </div>

                {/* Right Side */}
                <div className="about-right">
                    <div className="about-metric-card">
                        <h3>15,000+<span> sq ft Incubation Space</span></h3>
                    </div>
                    <div className="about-metric-card">
                        <h3>630+<span> Bed Hospital Access</span></h3>
                    </div>
                    <div className="about-metric-card">
                        <h3>35+<span> Startups Incubated</span></h3>
                    </div>
                    <div className="about-metric-card">
                        <h3>₹X Lakhs+<span> Grants Supported</span></h3>
                    </div>
                    <div className="about-metric-card">
                        <h3>Stanford<span> Biodesign Collaboration</span></h3>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
