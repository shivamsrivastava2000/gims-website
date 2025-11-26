// src/components/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/About.css";

// ✅ Initiatives / Partners logos
import nirman from "../assets/initiatives/nirman.jpg.jpg";
import innovativeIdeas from "../assets/initiatives/innovative-ideas.jpg";
import nationalIdeaBank from "../assets/initiatives/national-idea-bank.jpg";
import innovativeIdeasAlt from "../assets/initiatives/innovative-ideas-alt.jpg";
import startupTownhall from "../assets/initiatives/startup-townhall.jpg";
import doctorsIdea from "../assets/initiatives/doctors-idea.jpg";
import indiaDesign from "../assets/initiatives/india-design.jpg";

const About = () => {
    const initiatives = [
        { src: nirman, alt: "Nirman" },
        { src: innovativeIdeas, alt: "Innovative Ideas of India" },
        { src: nationalIdeaBank, alt: "National Idea Bank" },
        { src: innovativeIdeasAlt, alt: "Innovative Ideas of India (Alt)" },
        { src: startupTownhall, alt: "Startup Townhall" },
        { src: doctorsIdea, alt: "Doctors’ Idea for India" },
        { src: indiaDesign, alt: "India Design by GIMS CMI" },
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

                    {/* ✅ Indicative / Partners Card (NEW but integrated) */}
                    <div className="about-indicative-card">
                        <h3 className="about-indicative-title">
                            Our Indicative / Initiatives & Partners
                        </h3>

                        <div className="about-logos-grid">
                            {initiatives.map((item, i) => (
                                <div className="about-logo-box" key={i}>
                                    <img src={item.src} alt={item.alt} />
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
                    <div className="about-metric-card about-metric-wide">
                        <h3>Stanford<span> Biodesign Collaboration</span></h3>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
