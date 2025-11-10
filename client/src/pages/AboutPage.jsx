// src/pages/AboutPage.jsx
import React from 'react';
import "../styles/AboutPage.css";
import Contact from "../components/contact";

export default function AboutPage() {
    return (
        <section className="about-page">

            {/* HERO Section */}
            <div className="about-hero">
                <h1>About GIMS Centre for Medical Innovation</h1>
                <p>Transforming Healthcare Through Research, Innovation, and Purpose-Driven Entrepreneurship</p>
            </div>

            {/* WHO WE ARE */}
            <div className="about-section">
                <h2>Who We Are</h2>
                <p>
                    The GIMS Centre for Medical Innovation (CMI) is where clinical excellence meets visionary entrepreneurship.
                    Located within the Government Institute of Medical Sciences, Greater Noida, CMI is India's first public hospital-based medical incubator.
                    We exist to bridge the critical gap between real-world clinical needs and transformative healthcare solutions.
                </p>
                <p>
                    By embedding startups directly within a functioning 630-bed hospital ecosystem, we enable innovators to validate ideas, access mentorship,
                    conduct clinical trials, and create technologies that can truly change lives.
                </p>
            </div>

            {/* WHY CMI MATTERS */}
            <div className="about-section">
                <h2>Why CMI Matters</h2>
                <p>
                    Great healthcare innovation cannot happen in isolation. It demands collaboration between doctors, researchers, engineers, and entrepreneurs — all grounded in real clinical challenges.
                    CMI represents this collaborative spirit. We nurture indigenous healthcare innovation for India and the world by providing the rarest opportunity:
                    immediate clinical access combined with strategic incubation support.
                </p>
                <p>
                    Our mission is bigger than launching startups; we aim to reshape healthcare itself — making it smarter, faster, more affordable, and universally accessible.
                </p>
            </div>

            {/* MISSION & VISION */}
            <div className="about-section-cards">
                <div className="card">
                    <h3>Our Mission</h3>
                    <p>
                        To empower healthcare innovators to translate ideas into validated solutions that revolutionize patient care.
                    </p>
                </div>
                <div className="card">
                    <h3>Our Vision 2030</h3>
                    <p>
                        To establish India’s most trusted medical innovation ecosystem, propelling homegrown solutions to global impact.
                    </p>
                </div>
            </div>

            {/* FACILITIES */}
            <div className="about-section">
                <h2>Facilities and Support</h2>
                <ul>
                    <li>Clinical access to a 630-bed NABH-accredited hospital</li>
                    <li>15,000 sq. ft. incubator with prototyping labs and clinical trial units</li>
                    <li>Startup Clinics for direct doctor-entrepreneur collaboration</li>
                    <li>Strategic partnerships with Stanford Biodesign, BIRAC, IITs, and hospitals</li>
                    <li>Zero-cost incubation support for early-stage healthcare ventures</li>
                </ul>
            </div>

            {/* SUCCESS STORIES */}
            <div className="about-section">
                <h2>Startup Success Stories</h2>
                <p>
                    At CMI, success is measured not just in funding rounds but in lives touched and challenges overcome.
                    Startups like MATRI, who pioneered wearable menstrual pain relief technology, embody our spirit — transforming an unmet clinical need into an impactful innovation recognized nationally.
                </p>
                <p>
                    Our growing portfolio of ventures is a testament to the fact that with the right ecosystem, Indian innovators can lead the global future of healthcare.
                </p>
            </div>

            {/* OUR TEAM */}
            <div className="about-section">
                <h2>Our Leadership Team</h2>
                <div className="team-section">
                    <div className="team-member">
                        <img src="/team/rakesh-gupta.jpg" alt="Dr. (Brig) Rakesh Gupta" />
                        <h3>Dr. (Brig) Rakesh Gupta</h3>
                        <p>Director, GIMS Greater Noida</p>
                    </div>

                    <div className="team-member">
                        <img src="/team/mohit-kumar.jpg" alt="Dr. Mohit Kumar" />
                        <h3>Dr. Mohit Kumar</h3>
                        <p>Faculty Incharge, GIMS Incubator</p>
                    </div>

                    <div className="team-member">
                        <img src="/team/rahul-singh.jpg" alt="Dr. Rahul Singh" />
                        <h3>Dr. Rahul Singh</h3>
                        <p>Head, Centre for Medical Innovation, GIMS</p>
                    </div>
                </div>
            </div>

            {/* CONTACT */}
            <Contact />


        </section>
    );
}
