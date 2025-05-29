// src/components/SuccessHighlight.jsx
import React from 'react';
import "../styles/SuccessHighlight.css";

const SuccessHighlight = () => {
    return (
        <section className="success-highlight">
            <div className="success-content">
                <h2>Our Proud Moment</h2>
                <p>
                    Startups nurtured at GIMS CMI are shaping India's future.
                    Our startup <strong>MATRI</strong> showcased their innovation on <strong>Shark Tank India</strong>, inspiring millions and proving the power of clinical innovation.
                </p>
                <img src="src\assets\images\image3.png" alt="CMI Startup Shark Tank India Success" />
                {/* <a href="/about" className="learn-more-button">Read Full Story</a> */}
            </div>
        </section>
    );
};

export default SuccessHighlight;
