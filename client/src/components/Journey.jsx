// src/components/TimeMachine.jsx
import React from 'react';
import "../styles/Journey.css";

const TimeMachine = () => {
    return (
        <section className="time-machine">
            <h2 className="time-title">From Vision to Impact</h2>

            <div className="timeline-container">

                <div className="timeline-line"></div> {/* Connecting Line */}

                {/* 2024 - Foundation Year */}
                <div className="timeline-card fade-in-up">
                    <div className="timeline-dot"></div>
                    <h3>2024<br /><span>Foundation Year</span></h3>
                    <ul>
                        <li>Inauguration of GIMS CMI Centre</li>
                        <li>15,000 sq ft incubator setup</li>
                        <li>First 10 startups onboarded</li>
                    </ul>
                </div>

                {/* 2024 - Clinical Validation */}
                <div className="timeline-card fade-in-up">
                    <div className="timeline-dot"></div>
                    <h3>2024<br /><span>Clinical Validation Begins</span></h3>
                    <ul>
                        <li>Clinical Trial Unit activated</li>
                        <li>First successful startup trials started</li>
                        <li>Regulatory support system launched</li>
                    </ul>
                </div>

                {/* 2024 - Startup Recognition */}
                <div className="timeline-card fade-in-up">
                    <div className="timeline-dot"></div>
                    <h3>2024<br /><span>Startup Recognition</span></h3>
                    <ul>
                        <li>MATRI startup showcased on Shark Tank India</li>
                        <li>Startup grants secured by incubatees</li>
                        <li>First mentoring clinics held</li>
                    </ul>
                </div>

                {/* 2025 - Expansion Phase */}
                <div className="timeline-card fade-in-up">
                    <div className="timeline-dot"></div>
                    <h3>2025<br /><span>Expansion Phase</span></h3>
                    <ul>
                        <li>Skill Lab and Research Expansion</li>
                        <li>100+ startup clinics conducted</li>
                        <li>National level collaborations initiated</li>
                    </ul>
                </div>

                {/* 2025+ - Scaling Up */}
                <div className="timeline-card fade-in-up">
                    <div className="timeline-dot"></div>
                    <h3>2025+<br /><span>Scaling Up</span></h3>
                    <ul>
                        <li>50+ new healthcare startups onboarding</li>
                        <li>Global outreach programs</li>
                        <li>Launching healthcare innovation contests</li>
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default TimeMachine;
