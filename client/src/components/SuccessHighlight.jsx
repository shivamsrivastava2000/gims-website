// src/components/SuccessHighlight.jsx
import React from "react";
import "../styles/SuccessHighlight.css";
import image3 from "../assets/images/image3.png"; // <-- import

export default function SuccessHighlight() {
    return (
        <section className="success-highlight">
            <div className="success-content">
                <h2>Our Proud Moment</h2>
                <p>
                    Startups nurtured at GIMS CMI are shaping India's future. Our startup <strong>MATRI</strong> showcased their innovation on <strong>Shark Tank India</strong>, inspiring millions and proving the power of clinical innovation.
                </p>
                <img src={image3} alt="CMI Startup Shark Tank India Success" />
            </div>
        </section>
    );
}
