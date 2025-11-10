// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

const About = () => {
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
