// src/components/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';

// ✅ Initiatives logos
import nirmanLogo from '../assets/initiatives/nirman.jpg';
import nationalIdeaBank from '../assets/initiatives/national-idea-bank.jpg';
import innovativeIdeas from '../assets/initiatives/innovative-ideas.jpg';
import innovativeIdeasAlt from '../assets/initiatives/innovative-ideas-alt.jpg';
import startupTownhall from '../assets/initiatives/startup-townhall.jpg';
import doctorsIdea from '../assets/initiatives/doctors-idea.jpg';
import indiaDesign from '../assets/initiatives/india-design.jpg';

const initiatives = [
    { id: 'nirman', label: 'Nirman', img: nirmanLogo },
    { id: 'innovative-ideas-1', label: 'Innovative Ideas of India', img: innovativeIdeas },
    { id: 'national-idea-bank', label: 'National Idea Bank', img: nationalIdeaBank },
    { id: 'innovative-ideas-2', label: 'Innovative Ideas (Alt)', img: innovativeIdeasAlt },
    { id: 'startup-townhall', label: 'Startup Townhall', img: startupTownhall },
    { id: 'doctors-idea', label: "Doctors' Idea for India", img: doctorsIdea },
    { id: 'india-design', label: 'India Design by GIMS', img: indiaDesign },
];

const About = () => {
    return (
        <section className="about-section">
            <div className="about-container">

                {/* 🔹 Top: Text + Metrics in one band */}
                <div className="about-main">
                    {/* Left side: story */}
                    <div className="about-left">
                        <h2 className="about-heading">Empowering Healthcare Innovation</h2>

                        <p className="about-subtitle">
                            GIMS Centre for Medical Innovation (CMI) is India&apos;s first
                            public hospital-based medical incubator, nurturing healthcare
                            startups with clinical trials, mentorship, and world-class facilities.
                            Our mission is to bridge clinical excellence and entrepreneurial spirit
                            to create impactful, affordable healthcare solutions for India and
                            beyond.
                        </p>

                        {/* Flow steps */}
                        <div className="about-process">
                            <span className="step">Idea</span>
                            <span className="arrow">→</span>
                            <span className="step">Define</span>
                            <span className="arrow">→</span>
                            <span className="step">Validate</span>
                            <span className="arrow">→</span>
                            <span className="step">Commercialize</span>
                        </div>
                    </div>

                    {/* Right side: metrics */}
                    <div className="about-right">
                        <div className="about-metric-card">
                            <div className="metric-number">15,000+</div>
                            <div className="metric-label">sq ft Incubation Space</div>
                        </div>
                        <div className="about-metric-card">
                            <div className="metric-number">630+</div>
                            <div className="metric-label">Bed Hospital Access</div>
                        </div>
                        <div className="about-metric-card">
                            <div className="metric-number">45+</div>
                            <div className="metric-label">Startups Incubated</div>
                        </div>
                        <div className="about-metric-card">
                            <div className="metric-number">₹X Lakhs+</div>
                            <div className="metric-label">Grants Supported</div>
                        </div>
                        <div className="about-metric-card about-metric-wide">
                            <div className="metric-number">Stanford</div>
                            <div className="metric-label">Biodesign Centre</div>
                        </div>
                        <div className="about-metric-card about-metric-wide">
                            <div className="metric-number">Start IN UP</div>
                            <div className="metric-label">Registered</div>
                        </div>
                    </div>
                </div>

                {/* 🔹 Bottom: Initiatives block */}
                <div className="about-initiatives-card">
                    <div className="about-initiatives-header">
                        <h3>Our Indicative / Initiatives &amp; Partners</h3>
                        <p>
                            CMI GIMS works closely with multiple innovation programmes and
                            national initiatives to handhold MedTech founders from idea to
                            market.
                        </p>
                    </div>

                    <div className="initiatives-grid">
                        {initiatives.map(item => (
                            <div className="initiative-card" key={item.id}>
                                <div className="initiative-inner">
                                    <img src={item.img} alt={item.label} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="about-cta-row">
                        <Link to="/about" className="learn-more-button">
                            Learn More
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
